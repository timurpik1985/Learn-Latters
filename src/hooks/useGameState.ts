import { useState, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import {
  GameMode, GameItem, HebrewLetter, EnglishLetter, HebrewNumber,
  getPool, getItemKey, shuffle, PRAISE, ENCOURAGE, CUTE_EMOJIS
} from '../data/gameData';

const STORAGE_KEY = 'soundquest_save';

interface SaveData {
  mastered: Record<string, boolean>;
  score: number;
  streak: number;
}

export interface ConfettiItem {
  id: number;
  emoji: string;
  x: number;
}

export function useGameState() {
  const [mode, setModeState] = useState<GameMode>(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mastered, setMastered] = useState<Record<string, boolean>>({});
  const [currentItem, setCurrentItem] = useState<GameItem | null>(null);
  const [options, setOptions] = useState<GameItem[]>([]);
  const [answered, setAnswered] = useState(false);
  const [wrongThisRound, setWrongThisRound] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [correctKey, setCorrectKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; emoji: string; good: boolean } | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);
  const confettiId = useRef(0);
  const queue = useRef<GameItem[]>([]);

  const saveData = useCallback(async (m: Record<string, boolean>, sc: number, st: number) => {
    try {
      const data: SaveData = { mastered: m, score: sc, streak: st };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, []);

  const loadData = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: SaveData = JSON.parse(raw);
        setMastered(data.mastered || {});
        setScore(data.score || 0);
        setStreak(data.streak || 0);
        return data.mastered || {};
      }
    } catch {}
    return {};
  }, []);

  const speakItem = useCallback((item: GameItem) => {
    Speech.stop();
    const isHebrew = item.lang === 'he-IL';
    Speech.speak(item.speak, {
      language: item.lang,
      rate: isHebrew ? 0.66 : 0.82,
      pitch: isHebrew ? 0.96 : 1.05,
    });
  }, []);

  const fireCute = useCallback((count: number) => {
    const items: ConfettiItem[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: confettiId.current++,
        emoji: CUTE_EMOJIS[Math.floor(Math.random() * CUTE_EMOJIS.length)],
        x: Math.random() * 90 + 5,
      });
    }
    setConfetti(prev => [...prev, ...items]);
    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !items.find(i => i.id === c.id)));
    }, 3000);
  }, []);

  const buildQuestion = useCallback((currentMode: GameMode, currentMastered: Record<string, boolean>) => {
    const pool = getPool(currentMode);
    const unmastered = pool.filter(item => !currentMastered[getItemKey(item, currentMode)]);

    if (unmastered.length === 0) {
      setAllDone(true);
      fireCute(60);
      return;
    }

    if (queue.current.length === 0) {
      queue.current = shuffle(unmastered);
    }

    const item = queue.current.shift()!;
    setCurrentItem(item);
    setAnswered(false);
    setWrongThisRound(false);
    setSelectedKey(null);
    setCorrectKey(null);
    setFeedback(null);
    setShowNext(false);

    const distractors = shuffle(pool.filter(p => getItemKey(p, currentMode) !== getItemKey(item, currentMode))).slice(0, 4);
    setOptions(shuffle([item, ...distractors]));

    setTimeout(() => speakItem(item), 300);
  }, [speakItem, fireCute]);

  const masteredCount = useCallback((m: Record<string, boolean>, currentMode: GameMode) => {
    const pool = getPool(currentMode);
    return pool.filter(item => m[getItemKey(item, currentMode)]).length;
  }, []);

  const handleAnswer = useCallback((chosen: GameItem, correct: GameItem, currentMode: GameMode, currentScore: number, currentStreak: number, currentMastered: Record<string, boolean>, wrongRound: boolean) => {
    if (answered) return;

    const chosenKey = getItemKey(chosen, currentMode);
    const correctKey = getItemKey(correct, currentMode);
    const isCorrect = chosenKey === correctKey;

    setSelectedKey(chosenKey);
    setCorrectKey(correctKey);
    setAnswered(true);

    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      let newMastered = { ...currentMastered };
      let newlyMastered = false;
      let newScore = currentScore;
      let newStreak = currentStreak;

      if (!wrongRound && !newMastered[correctKey]) {
        newMastered[correctKey] = true;
        newlyMastered = true;
      }
      if (!wrongRound) {
        newScore++;
        newStreak++;
      }

      setMastered(newMastered);
      setScore(newScore);
      setStreak(newStreak);
      saveData(newMastered, newScore, newStreak);

      if (newlyMastered) {
        const item = correct as HebrewLetter & HebrewNumber & EnglishLetter;
        const masteredText = currentMode === 1
          ? `${item.he} = ${item.display}`
          : currentMode === 2
          ? item.display
          : `${item.he} = ${item.num}`;
        setFeedback({ emoji: '⭐', text: `${masteredText} — מסטר!`, good: true });
        fireCute(40);
      } else {
        setFeedback({
          emoji: newStreak >= 5 ? '🔥' : '💕',
          text: PRAISE[Math.floor(Math.random() * PRAISE.length)],
          good: true,
        });
        if (!wrongRound) fireCute(18);
      }

      setShowNext(true);

      const mc = masteredCount(newMastered, currentMode);
      if (mc === getPool(currentMode).length) {
        setTimeout(() => {
          setAllDone(true);
          fireCute(60);
          setTimeout(() => fireCute(60), 500);
        }, 1600);
      }
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      if (!wrongRound) {
        setWrongThisRound(true);
        const newStreak = 0;
        setStreak(newStreak);
        saveData(currentMastered, currentScore, newStreak);
      }
      setFeedback({
        emoji: '💪',
        text: ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)],
        good: false,
      });
    }
  }, [answered, saveData, fireCute, masteredCount]);

  const setMode = useCallback((m: GameMode, currentMastered: Record<string, boolean>) => {
    setModeState(m);
    setAllDone(false);
    queue.current = [];
    buildQuestion(m, currentMastered);
  }, [buildQuestion]);

  const resetAll = useCallback(async () => {
    const empty = {};
    setMastered(empty);
    setScore(0);
    setStreak(0);
    await saveData(empty, 0, 0);
    setAllDone(false);
    queue.current = [];
    buildQuestion(mode, empty);
  }, [saveData, buildQuestion, mode]);

  const playAgain = useCallback((currentMode: GameMode) => {
    setAllDone(false);
    queue.current = [];
    buildQuestion(currentMode, mastered);
  }, [buildQuestion, mastered]);

  return {
    mode, score, streak, mastered, currentItem, options,
    answered, wrongThisRound, selectedKey, correctKey,
    feedback, showNext, allDone, confetti,
    setMode, handleAnswer, buildQuestion, loadData, speakItem,
    resetAll, playAgain, masteredCount,
  };
}
