import React, { useEffect, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  useWindowDimensions, Alert, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameState } from '../hooks/useGameState';
import { getPool, getItemKey, GameMode, HebrewLetter, EnglishLetter, HebrewNumber } from '../data/gameData';
import { ConfettiPiece } from '../components/ConfettiPiece';

const COLORS = {
  bg: '#0f0f23',
  card: '#1a1a3e',
  ink: '#ffffff',
  sub: '#a0aec0',
  m1: '#f6c90e',
  m2: '#ff6b9d',
  m3: '#00d4aa',
  border: 'rgba(255,255,255,0.12)',
  opt: '#1e2a4a',
  red: '#ef4444',
};

const MODE_COLORS = [COLORS.m1, COLORS.m2, COLORS.m3];
const MODE_LABELS = ['Hebrew Letters', 'English Letters', 'Hebrew Numbers'];
const MODE_ICONS = ['א', 'A', '123'];

export default function GameScreen() {
  const { width, height } = useWindowDimensions();
  const {
    mode, score, streak, mastered, currentItem, options,
    answered, wrongThisRound, selectedKey, correctKey,
    feedback, showNext, allDone, confetti,
    setMode, handleAnswer, buildQuestion, loadData, speakItem,
    resetAll, playAgain, masteredCount,
  } = useGameState();

  const modeColor = MODE_COLORS[mode - 1];
  const pool = getPool(mode);
  const mc = masteredCount(mastered, mode);
  const progress = pool.length > 0 ? mc / pool.length : 0;

  useEffect(() => {
    (async () => {
      const savedMastered = await loadData();
      buildQuestion(mode, savedMastered);
    })();
  }, []);

  const onSelectMode = useCallback((m: GameMode) => {
    setMode(m, mastered);
  }, [setMode, mastered]);

  const onAnswer = useCallback((chosen: typeof currentItem) => {
    if (!chosen || !currentItem || answered) return;
    handleAnswer(chosen, currentItem, mode, score, streak, mastered, wrongThisRound);
  }, [currentItem, answered, handleAnswer, mode, score, streak, mastered, wrongThisRound]);

  const onNext = useCallback(() => {
    buildQuestion(mode, mastered);
  }, [buildQuestion, mode, mastered]);

  const onReset = useCallback(() => {
    Alert.alert('Reset Progress', 'Reset all progress?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: resetAll },
    ]);
  }, [resetAll]);

  const getOptionStyle = (item: typeof currentItem) => {
    if (!item || !answered) return {};
    const key = getItemKey(item, mode);
    if (key === correctKey) return styles.optCorrect;
    if (key === selectedKey) return styles.optWrong;
    return {};
  };

  const getOptionTextStyle = (item: typeof currentItem) => {
    if (!item || !answered) return {};
    const key = getItemKey(item, mode);
    if (key === correctKey || key === selectedKey) return { color: '#fff' };
    return {};
  };

  const renderQuestion = () => {
    if (!currentItem) return null;
    if (mode === 1) return (currentItem as HebrewLetter).he;
    if (mode === 2) return (currentItem as EnglishLetter).display;
    return (currentItem as HebrewNumber).he;
  };

  const renderOptionText = (item: typeof options[0]) => {
    if (mode === 1) return (item as HebrewLetter).display;
    if (mode === 2) return (item as EnglishLetter).display;
    return (item as HebrewNumber).display;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>

        {/* Confetti overlay */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {confetti.map(item => (
            <ConfettiPiece key={item.id} item={item} screenHeight={height} />
          ))}
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}><Text style={{ color: modeColor }}>לומדים</Text> אותיות</Text>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={[styles.statText, { color: COLORS.m1 }]}>⭐ {score}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statText, { color: COLORS.m2 }]}>🔥 {streak}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
            <Text style={{ color: COLORS.sub, fontSize: 16 }}>↻</Text>
          </TouchableOpacity>
        </View>

        {/* Mode bar */}
        <View style={styles.modeBar}>
          {([1, 2, 3] as GameMode[]).map(m => (
            <TouchableOpacity
              key={m}
              style={[styles.modeBtn, mode === m && { backgroundColor: MODE_COLORS[m - 1] }]}
              onPress={() => onSelectMode(m)}
            >
              <Text style={[styles.modeBtnIcon, mode === m && { color: '#000' }]}>{MODE_ICONS[m - 1]}</Text>
              <Text style={[styles.modeBtnLabel, mode === m && { color: '#000' }]}>{MODE_LABELS[m - 1]}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Progress bar */}
          <View style={styles.progressWrap}>
            <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: modeColor }]} />
          </View>

          {!allDone ? (
            <View style={styles.gameArea}>
              {/* Question zone */}
              <View style={[styles.questionZone, { borderColor: `${modeColor}55`, backgroundColor: `${modeColor}18` }]}>
                <Text style={[styles.qLabel, { color: modeColor }]}>
                  {mode === 1 ? 'HEAR THE LETTER — PICK THE HEBREW' : mode === 2 ? 'HEAR THE LETTER — PICK THE ENGLISH' : 'HEAR THE NUMBER — PICK THE DIGIT'}
                </Text>
                <Text style={[styles.qDisplay, { color: modeColor, writingDirection: mode === 2 ? 'ltr' : 'rtl' }]}>
                  {renderQuestion()}
                </Text>
                <TouchableOpacity
                  style={[styles.speakBtn, { backgroundColor: modeColor }]}
                  onPress={() => currentItem && speakItem(currentItem)}
                >
                  <Text style={[styles.speakBtnText, { color: mode === 2 ? '#fff' : '#000' }]}>
                    🔊 Hear it again
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Options grid */}
              <View style={styles.optionsGrid}>
                {options.map((opt, idx) => {
                  const key = getItemKey(opt, mode);
                  const isLast = idx === 4;
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.option,
                        isLast && styles.optionFull,
                        getOptionStyle(opt),
                      ]}
                      onPress={() => onAnswer(opt)}
                      disabled={answered && getItemKey(opt, mode) !== correctKey && getItemKey(opt, mode) !== selectedKey}
                    >
                      <Text style={[styles.optionText, getOptionTextStyle(opt)]}>
                        {renderOptionText(opt)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Feedback + Next */}
              {feedback && (
                <View style={[styles.feedback, feedback.good ? styles.feedbackGood : styles.feedbackBad]}>
                  <Text style={[styles.feedbackText, { color: feedback.good ? '#5fffda' : '#ffb3ce' }]}>
                    {feedback.emoji} {feedback.text}
                  </Text>
                </View>
              )}
              {showNext && (
                <TouchableOpacity style={[styles.nextBtn, { backgroundColor: modeColor }]} onPress={onNext}>
                  <Text style={[styles.nextBtnText, { color: mode === 2 ? '#fff' : '#000' }]}>next →</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            /* All Done screen */
            <View style={styles.allDone}>
              <Text style={styles.allDoneTrophy}>🏆</Text>
              <Text style={styles.allDoneTitle}>All Mastered!</Text>
              <Text style={styles.allDoneSub}>
                {mode === 1 ? 'ידעת את כל האותיות!' : mode === 2 ? 'You know all the letters!' : 'ידעת את המספרים 1-20!'}
              </Text>
              <TouchableOpacity
                style={[styles.playAgainBtn, { backgroundColor: modeColor }]}
                onPress={() => playAgain(mode)}
              >
                <Text style={[styles.playAgainText, { color: mode === 2 ? '#fff' : '#000' }]}>
                  play again 🚀
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  container: { flex: 1, paddingHorizontal: 10, paddingVertical: 8, gap: 8 },

  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 },
  logo: { fontFamily: 'Rubik_900Black', fontSize: 18, color: COLORS.ink, letterSpacing: -0.5 },
  stats: { flexDirection: 'row', gap: 5 },
  stat: { backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  statText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 12 },
  resetBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },

  modeBar: { flexDirection: 'row', gap: 5, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, padding: 4 },
  modeBtn: { flex: 1, paddingVertical: 8, borderRadius: 11, alignItems: 'center' },
  modeBtnIcon: { fontFamily: 'Rubik_900Black', fontSize: 16, color: COLORS.sub },
  modeBtnLabel: { fontFamily: 'Nunito_800ExtraBold', fontSize: 9, color: COLORS.sub, textAlign: 'center', marginTop: 2 },

  card: { flex: 1, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: 20, padding: 14, gap: 10 },

  progressWrap: { height: 8, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' },
  progressBar: { height: '100%', borderRadius: 999 },

  gameArea: { flex: 1, gap: 10 },

  questionZone: { borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1 },
  qLabel: { fontFamily: 'Nunito_800ExtraBold', fontSize: 9, letterSpacing: 1.5, marginBottom: 10, opacity: 0.8 },
  qDisplay: { fontFamily: 'Rubik_900Black', fontSize: 42, lineHeight: 50, marginBottom: 12, color: '#fff' },
  speakBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 22, paddingVertical: 10, borderRadius: 999 },
  speakBtnText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 13 },

  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, flex: 1 },
  option: { width: '47.5%', flex: 0, aspectRatio: 1.6, backgroundColor: COLORS.opt, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  optionFull: { width: '100%', aspectRatio: 4 },
  optionText: { fontFamily: 'Rubik_700Bold', fontSize: 26, color: COLORS.ink },
  optCorrect: { backgroundColor: '#16533a', borderColor: COLORS.m3 },
  optWrong: { backgroundColor: '#5a1a1a', borderColor: COLORS.red },

  feedback: { padding: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  feedbackGood: { backgroundColor: 'rgba(0,212,170,0.15)', borderColor: COLORS.m3 },
  feedbackBad: { backgroundColor: 'rgba(255,107,157,0.15)', borderColor: COLORS.m2 },
  feedbackText: { fontFamily: 'Nunito_700Bold', fontSize: 14 },

  nextBtn: { padding: 13, borderRadius: 12, alignItems: 'center' },
  nextBtnText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 15 },

  allDone: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  allDoneTrophy: { fontSize: 64 },
  allDoneTitle: { fontFamily: 'Rubik_900Black', fontSize: 28, color: COLORS.ink },
  allDoneSub: { fontFamily: 'Nunito_400Regular', fontSize: 15, color: COLORS.sub },
  playAgainBtn: { paddingHorizontal: 30, paddingVertical: 13, borderRadius: 12, marginTop: 8 },
  playAgainText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 15 },
});
