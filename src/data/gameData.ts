export type GameMode = 1 | 2 | 3;

export interface HebrewLetter {
  display: string;
  he: string;
  speak: string;
  lang: string;
}

export interface EnglishLetter {
  display: string;
  name: string;
  speak: string;
  lang: string;
}

export interface HebrewNumber {
  num: number;
  he: string;
  speak: string;
  display: string;
  lang: string;
}

export type GameItem = HebrewLetter | EnglishLetter | HebrewNumber;

export const HEBREW_LETTERS: HebrewLetter[] = [
  { display: 'א', he: 'אָלֶף',         speak: 'הָאוֹת אָלֶף',           lang: 'he-IL' },
  { display: 'ב', he: 'בֵּית',          speak: 'הָאוֹת בֵּית',            lang: 'he-IL' },
  { display: 'ג', he: 'גִּימֶל',        speak: 'הָאוֹת גִּימֶל',          lang: 'he-IL' },
  { display: 'ד', he: 'דָּלֶת',         speak: 'הָאוֹת דָּלֶת',           lang: 'he-IL' },
  { display: 'ה', he: 'הֵא',            speak: 'הָאוֹת הֵא',              lang: 'he-IL' },
  { display: 'ו', he: 'וָו',            speak: 'הָאוֹת וָו',              lang: 'he-IL' },
  { display: 'ז', he: 'זַיִן',          speak: 'הָאוֹת זַיִן',            lang: 'he-IL' },
  { display: 'ח', he: 'חֵית',           speak: 'הָאוֹת חֵית',             lang: 'he-IL' },
  { display: 'ט', he: 'טֵית',           speak: 'הָאוֹת טֵית',             lang: 'he-IL' },
  { display: 'י', he: 'יוֹד',           speak: 'הָאוֹת יוֹד',             lang: 'he-IL' },
  { display: 'כ', he: 'כַּף',           speak: 'הָאוֹת כַּף',             lang: 'he-IL' },
  { display: 'ך', he: 'כַּף סוֹפִית',   speak: 'הָאוֹת כַּף סוֹפִית',     lang: 'he-IL' },
  { display: 'ל', he: 'לָמֶד',          speak: 'הָאוֹת לָמֶד',            lang: 'he-IL' },
  { display: 'מ', he: 'מֵם',            speak: 'הָאוֹת מֵם',              lang: 'he-IL' },
  { display: 'ם', he: 'מֵם סוֹפִית',    speak: 'הָאוֹת מֵם סוֹפִית',      lang: 'he-IL' },
  { display: 'נ', he: 'נוּן',           speak: 'הָאוֹת נוּן',             lang: 'he-IL' },
  { display: 'ן', he: 'נוּן סוֹפִית',   speak: 'הָאוֹת נוּן סוֹפִית',     lang: 'he-IL' },
  { display: 'ס', he: 'סָמֶךְ',         speak: 'הָאוֹת סָמֶךְ',           lang: 'he-IL' },
  { display: 'ע', he: 'עַיִן',          speak: 'הָאוֹת עַיִן',            lang: 'he-IL' },
  { display: 'פ', he: 'פֵּא',           speak: 'הָאוֹת פֵּא',             lang: 'he-IL' },
  { display: 'ף', he: 'פֵּא סוֹפִית',   speak: 'הָאוֹת פֵּא סוֹפִית',     lang: 'he-IL' },
  { display: 'צ', he: 'צַדִּי',         speak: 'הָאוֹת צַדִּי',           lang: 'he-IL' },
  { display: 'ץ', he: 'צַדִּי סוֹפִית', speak: 'הָאוֹת צַדִּי סוֹפִית',   lang: 'he-IL' },
  { display: 'ק', he: 'קוֹף',           speak: 'הָאוֹת קוֹף',             lang: 'he-IL' },
  { display: 'ר', he: 'רֵישׁ',          speak: 'הָאוֹת רֵישׁ',            lang: 'he-IL' },
  { display: 'ש', he: 'שִׁין',          speak: 'הָאוֹת שִׁין',            lang: 'he-IL' },
  { display: 'ת', he: 'תָּו',           speak: 'הָאוֹת תָּו',             lang: 'he-IL' },
];

export const ENGLISH_LETTERS: EnglishLetter[] = [
  { display: 'A', name: 'A', speak: 'ay',         lang: 'en-US' },
  { display: 'B', name: 'B', speak: 'bee',        lang: 'en-US' },
  { display: 'C', name: 'C', speak: 'see',        lang: 'en-US' },
  { display: 'D', name: 'D', speak: 'dee',        lang: 'en-US' },
  { display: 'E', name: 'E', speak: 'ee',         lang: 'en-US' },
  { display: 'F', name: 'F', speak: 'ef',         lang: 'en-US' },
  { display: 'G', name: 'G', speak: 'jee',        lang: 'en-US' },
  { display: 'H', name: 'H', speak: 'aitch',      lang: 'en-US' },
  { display: 'I', name: 'I', speak: 'eye',        lang: 'en-US' },
  { display: 'J', name: 'J', speak: 'jay',        lang: 'en-US' },
  { display: 'K', name: 'K', speak: 'kay',        lang: 'en-US' },
  { display: 'L', name: 'L', speak: 'el',         lang: 'en-US' },
  { display: 'M', name: 'M', speak: 'em',         lang: 'en-US' },
  { display: 'N', name: 'N', speak: 'en',         lang: 'en-US' },
  { display: 'O', name: 'O', speak: 'oh',         lang: 'en-US' },
  { display: 'P', name: 'P', speak: 'pee',        lang: 'en-US' },
  { display: 'Q', name: 'Q', speak: 'cue',        lang: 'en-US' },
  { display: 'R', name: 'R', speak: 'ar',         lang: 'en-US' },
  { display: 'S', name: 'S', speak: 'ess',        lang: 'en-US' },
  { display: 'T', name: 'T', speak: 'tee',        lang: 'en-US' },
  { display: 'U', name: 'U', speak: 'you',        lang: 'en-US' },
  { display: 'V', name: 'V', speak: 'vee',        lang: 'en-US' },
  { display: 'W', name: 'W', speak: 'double you', lang: 'en-US' },
  { display: 'X', name: 'X', speak: 'ex',         lang: 'en-US' },
  { display: 'Y', name: 'Y', speak: 'why',        lang: 'en-US' },
  { display: 'Z', name: 'Z', speak: 'zed',        lang: 'en-US' },
];

export const HEBREW_NUMBERS: HebrewNumber[] = [
  { num: 1,  he: 'אַחַת',              speak: 'הַמִּסְפָּר אַחַת',              display: '1',  lang: 'he-IL' },
  { num: 2,  he: 'שְׁתַּיִם',          speak: 'הַמִּסְפָּר שְׁתַּיִם',          display: '2',  lang: 'he-IL' },
  { num: 3,  he: 'שָׁלוֹשׁ',           speak: 'הַמִּסְפָּר שָׁלוֹשׁ',           display: '3',  lang: 'he-IL' },
  { num: 4,  he: 'אַרְבַּע',           speak: 'הַמִּסְפָּר אַרְבַּע',           display: '4',  lang: 'he-IL' },
  { num: 5,  he: 'חָמֵשׁ',             speak: 'הַמִּסְפָּר חָמֵשׁ',             display: '5',  lang: 'he-IL' },
  { num: 6,  he: 'שֵׁשׁ',              speak: 'הַמִּסְפָּר שֵׁשׁ',              display: '6',  lang: 'he-IL' },
  { num: 7,  he: 'שֶׁבַע',             speak: 'הַמִּסְפָּר שֶׁבַע',             display: '7',  lang: 'he-IL' },
  { num: 8,  he: 'שְׁמוֹנֶה',          speak: 'הַמִּסְפָּר שְׁמוֹנֶה',          display: '8',  lang: 'he-IL' },
  { num: 9,  he: 'תֵּשַׁע',            speak: 'הַמִּסְפָּר תֵּשַׁע',            display: '9',  lang: 'he-IL' },
  { num: 10, he: 'עֶשֶׂר',             speak: 'הַמִּסְפָּר עֶשֶׂר',             display: '10', lang: 'he-IL' },
  { num: 11, he: 'אַחַת עֶשְׂרֵה',     speak: 'הַמִּסְפָּר אַחַת עֶשְׂרֵה',     display: '11', lang: 'he-IL' },
  { num: 12, he: 'שְׁתֵּים עֶשְׂרֵה',  speak: 'הַמִּסְפָּר שְׁתֵּים עֶשְׂרֵה',  display: '12', lang: 'he-IL' },
  { num: 13, he: 'שְׁלוֹשׁ עֶשְׂרֵה',  speak: 'הַמִּסְפָּר שְׁלוֹשׁ עֶשְׂרֵה',  display: '13', lang: 'he-IL' },
  { num: 14, he: 'אַרְבַּע עֶשְׂרֵה',  speak: 'הַמִּסְפָּר אַרְבַּע עֶשְׂרֵה',  display: '14', lang: 'he-IL' },
  { num: 15, he: 'חֲמֵשׁ עֶשְׂרֵה',    speak: 'הַמִּסְפָּר חֲמֵשׁ עֶשְׂרֵה',    display: '15', lang: 'he-IL' },
  { num: 16, he: 'שֵׁשׁ עֶשְׂרֵה',     speak: 'הַמִּסְפָּר שֵׁשׁ עֶשְׂרֵה',     display: '16', lang: 'he-IL' },
  { num: 17, he: 'שְׁבַע עֶשְׂרֵה',    speak: 'הַמִּסְפָּר שְׁבַע עֶשְׂרֵה',    display: '17', lang: 'he-IL' },
  { num: 18, he: 'שְׁמוֹנֶה עֶשְׂרֵה', speak: 'הַמִּסְפָּר שְׁמוֹנֶה עֶשְׂרֵה', display: '18', lang: 'he-IL' },
  { num: 19, he: 'תְּשַׁע עֶשְׂרֵה',   speak: 'הַמִּסְפָּר תְּשַׁע עֶשְׂרֵה',   display: '19', lang: 'he-IL' },
  { num: 20, he: 'עֶשְׂרִים',          speak: 'הַמִּסְפָּר עֶשְׂרִים',          display: '20', lang: 'he-IL' },
];

export const PRAISE = [
  'אתה נהדר! 🤩', 'אתה גדול! 🌟', 'אתה מדהים! 💎', 'אתה גאון אמיתי! 🧠',
  'אתה סופרסטאר! 🦄', 'אתה הכי טוב! 👑', 'עבודה יפה מאוד! 👏', 'כל הכבוד! 🏆',
  'וואו, זה מדהים! 🥳', 'יופי שלך! 🌸', 'מצוין ברצינות! 💪', 'ניצחת שוב! 🌟',
  'כוכב אמיתי! 💫', 'בראבו עליך! 🎉', 'פנטסטי באמת! 🌈', 'מושלם לגמרי! 🤩',
];

export const ENCOURAGE = ['נסה שוב! 💪', 'כמעט! 🎯', 'בוא, תוכל! 🚀', 'עוד פעם! ✨'];

export const CUTE_EMOJIS = ['🐱','🐈','🐶','🦄','😸','🌸','🌹','🌺','🌷','🍀','👼','⭐','🌈','🌟','💫','💜','💙','💚','💛','🧸'];

export function getPool(mode: GameMode): GameItem[] {
  if (mode === 1) return HEBREW_LETTERS;
  if (mode === 2) return ENGLISH_LETTERS;
  return HEBREW_NUMBERS;
}

export function getItemKey(item: GameItem, mode: GameMode): string {
  if (mode === 3) return String((item as HebrewNumber).num);
  return (item as HebrewLetter | EnglishLetter).display;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
