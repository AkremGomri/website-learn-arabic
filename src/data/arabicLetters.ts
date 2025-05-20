// Arabic letters with their different forms, pronunciation, and vowels
export interface ArabicLetter {
  id: string;
  name: string;
  isolated: string;
  beginning: string;
  middle: string;
  end: string;
  pronunciation: string;
  soundUrl?: string;
  canConnectNext: boolean; // Whether the letter can connect to the next letter
}

// Vowels (harakat)
export const arabicVowels = [
  { id: 'fatha', symbol: 'َ', name: 'فتحة', sound: 'a' },
  { id: 'damma', symbol: 'ُ', name: 'ضمة', sound: 'u' },
  { id: 'kasra', symbol: 'ِ', name: 'كسرة', sound: 'i' },
  { id: 'sukun', symbol: 'ْ', name: 'سكون', sound: '' },
  { id: 'shadda', symbol: 'ّ', name: 'شدة', sound: 'double' },
  { id: 'tanwin_fath', symbol: 'ً', name: 'تنوين فتح', sound: 'an' },
  { id: 'tanwin_damm', symbol: 'ٌ', name: 'تنوين ضم', sound: 'un' },
  { id: 'tanwin_kasr', symbol: 'ٍ', name: 'تنوين كسر', sound: 'in' }
];

export const arabicLetters: ArabicLetter[] = [
  {
    id: "alif_hamza",
    name: "ألف مع همزة",
    isolated: "أ",
    beginning: "أ",
    middle: "ـأ",
    end: "ـأ",
    pronunciation: "alif hamza",
    soundUrl: "/sounds/alif_hamza.mp3",
    canConnectNext: false
  },
  {
    id: "alif",
    name: "ألف مد",
    isolated: "ا",
    beginning: "ا",
    middle: "ـا",
    end: "ـا",
    pronunciation: "alif mad",
    soundUrl: "/sounds/alif.mp3",
    canConnectNext: false
  },
  {
    id: "ba",
    name: "باء",
    isolated: "ب",
    beginning: "بـ",
    middle: "ـبـ",
    end: "ـب",
    pronunciation: "ba",
    soundUrl: "/sounds/ba.mp3",
    canConnectNext: true
  },
  {
    id: "ta",
    name: "تاء",
    isolated: "ت",
    beginning: "تـ",
    middle: "ـتـ",
    end: "ـت",
    pronunciation: "ta",
    soundUrl: "/sounds/ta.mp3",
    canConnectNext: true
  },
  {
    id: "tha",
    name: "ثاء",
    isolated: "ث",
    beginning: "ثـ",
    middle: "ـثـ",
    end: "ـث",
    pronunciation: "tha",
    soundUrl: "/sounds/tha.mp3",
    canConnectNext: true
  },
  {
    id: "jim",
    name: "جيم",
    isolated: "ج",
    beginning: "جـ",
    middle: "ـجـ",
    end: "ـج",
    pronunciation: "jim",
    soundUrl: "/sounds/jim.mp3",
    canConnectNext: true
  },
  {
    id: "ha",
    name: "حاء",
    isolated: "ح",
    beginning: "حـ",
    middle: "ـحـ",
    end: "ـح",
    pronunciation: "ha",
    soundUrl: "/sounds/ha.mp3",
    canConnectNext: true
  },
  {
    id: "kha",
    name: "خاء",
    isolated: "خ",
    beginning: "خـ",
    middle: "ـخـ",
    end: "ـخ",
    pronunciation: "kha",
    soundUrl: "/sounds/kha.mp3",
    canConnectNext: true
  },
  {
    id: "dal",
    name: "دال",
    isolated: "د",
    beginning: "د",
    middle: "ـد",
    end: "ـد",
    pronunciation: "dal",
    soundUrl: "/sounds/dal.mp3",
    canConnectNext: false
  },
  {
    id: "thal",
    name: "ذال",
    isolated: "ذ",
    beginning: "ذ",
    middle: "ـذ",
    end: "ـذ",
    pronunciation: "thal",
    soundUrl: "/sounds/thal.mp3",
    canConnectNext: false
  },
  {
    id: "ra",
    name: "راء",
    isolated: "ر",
    beginning: "ر",
    middle: "ـر",
    end: "ـر",
    pronunciation: "ra",
    soundUrl: "/sounds/ra.mp3",
    canConnectNext: false
  },
  {
    id: "zai",
    name: "زاي",
    isolated: "ز",
    beginning: "ز",
    middle: "ـز",
    end: "ـز",
    pronunciation: "zai",
    soundUrl: "/sounds/zai.mp3",
    canConnectNext: false
  },
  {
    id: "sin",
    name: "سين",
    isolated: "س",
    beginning: "سـ",
    middle: "ـسـ",
    end: "ـس",
    pronunciation: "sin",
    soundUrl: "/sounds/sin.mp3",
    canConnectNext: true
  },
  {
    id: "shin",
    name: "شين",
    isolated: "ش",
    beginning: "شـ",
    middle: "ـشـ",
    end: "ـش",
    pronunciation: "shin",
    soundUrl: "/sounds/shin.mp3",
    canConnectNext: true
  },
  {
    id: "sad",
    name: "صاد",
    isolated: "ص",
    beginning: "صـ",
    middle: "ـصـ",
    end: "ـص",
    pronunciation: "sad",
    soundUrl: "/sounds/sad.mp3",
    canConnectNext: true
  },
  {
    id: "dad",
    name: "ضاد",
    isolated: "ض",
    beginning: "ضـ",
    middle: "ـضـ",
    end: "ـض",
    pronunciation: "dad",
    soundUrl: "/sounds/dad.mp3",
    canConnectNext: true
  },
  {
    id: "ta_",
    name: "طاء",
    isolated: "ط",
    beginning: "طـ",
    middle: "ـطـ",
    end: "ـط",
    pronunciation: "ta",
    soundUrl: "/sounds/ta_.mp3",
    canConnectNext: true
  },
  {
    id: "za_",
    name: "ظاء",
    isolated: "ظ",
    beginning: "ظـ",
    middle: "ـظـ",
    end: "ـظ",
    pronunciation: "za",
    soundUrl: "/sounds/za_.mp3",
    canConnectNext: true
  },
  {
    id: "ain",
    name: "عين",
    isolated: "ع",
    beginning: "عـ",
    middle: "ـعـ",
    end: "ـع",
    pronunciation: "ain",
    soundUrl: "/sounds/ain.mp3",
    canConnectNext: true
  },
  {
    id: "ghain",
    name: "غين",
    isolated: "غ",
    beginning: "غـ",
    middle: "ـغـ",
    end: "ـغ",
    pronunciation: "ghain",
    soundUrl: "/sounds/ghain.mp3",
    canConnectNext: true
  },
  {
    id: "fa",
    name: "فاء",
    isolated: "ف",
    beginning: "فـ",
    middle: "ـفـ",
    end: "ـف",
    pronunciation: "fa",
    soundUrl: "/sounds/fa.mp3",
    canConnectNext: true
  },
  {
    id: "qaf",
    name: "قاف",
    isolated: "ق",
    beginning: "قـ",
    middle: "ـقـ",
    end: "ـق",
    pronunciation: "qaf",
    soundUrl: "/sounds/qaf.mp3",
    canConnectNext: true
  },
  {
    id: "kaf",
    name: "كاف",
    isolated: "ك",
    beginning: "كـ",
    middle: "ـكـ",
    end: "ـك",
    pronunciation: "kaf",
    soundUrl: "/sounds/kaf.mp3",
    canConnectNext: true
  },
  {
    id: "lam",
    name: "لام",
    isolated: "ل",
    beginning: "لـ",
    middle: "ـلـ",
    end: "ـل",
    pronunciation: "lam",
    soundUrl: "/sounds/lam.mp3",
    canConnectNext: true
  },
  {
    id: "mim",
    name: "ميم",
    isolated: "م",
    beginning: "مـ",
    middle: "ـمـ",
    end: "ـم",
    pronunciation: "mim",
    soundUrl: "/sounds/mim.mp3",
    canConnectNext: true
  },
  {
    id: "nun",
    name: "نون",
    isolated: "ن",
    beginning: "نـ",
    middle: "ـنـ",
    end: "ـن",
    pronunciation: "nun",
    soundUrl: "/sounds/nun.mp3",
    canConnectNext: true
  },
  {
    id: "ha_",
    name: "هاء",
    isolated: "ه",
    beginning: "هـ",
    middle: "ـهـ",
    end: "ـه",
    pronunciation: "ha",
    soundUrl: "/sounds/ha_.mp3",
    canConnectNext: true
  },
  {
    id: "waw_cons",
    name: "واو",
    isolated: "و",
    beginning: "و",
    middle: "ـو",
    end: "ـو",
    pronunciation: "waw",
    soundUrl: "/sounds/waw.mp3",
    canConnectNext: false
  },
  {
    id: "waw",
    name: "واو مد",
    isolated: "و",
    beginning: "و",
    middle: "ـو",
    end: "ـو",
    pronunciation: "waw mad",
    soundUrl: "/sounds/waw_mad.mp3",
    canConnectNext: false
  },
  {
    id: "ya_cons",
    name: "ياء",
    isolated: "ي",
    beginning: "يـ",
    middle: "ـيـ",
    end: "ـي",
    pronunciation: "ya",
    soundUrl: "/sounds/ya.mp3",
    canConnectNext: true
  },
  {
    id: "ya",
    name: "ياء مد",
    isolated: "ي",
    beginning: "يـ",
    middle: "ـيـ",
    end: "ـي",
    pronunciation: "ya mad",
    soundUrl: "/sounds/ya_mad.mp3",
    canConnectNext: true
  },
  {
    id: "hamza",
    name: "همزة",
    isolated: "ء",
    beginning: "ء",
    middle: "ء",
    end: "ء",
    pronunciation: "hamza",
    soundUrl: "/sounds/hamza.mp3",
    canConnectNext: false
  }
];

// Get a random letter
export const getRandomLetter = (): ArabicLetter => {
  const randomIndex = Math.floor(Math.random() * arabicLetters.length);
  return arabicLetters[randomIndex];
};

// Get letter by ID
export const getLetterById = (id: string): ArabicLetter | undefined => {
  return arabicLetters.find(letter => letter.id === id);
};