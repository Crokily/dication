export interface WordList {
  id: string;
  name: string;
  words: string[];
}

export interface Settings {
  pronunciation: "American" | "British";
  playCount: number;
  interval: number;
  wordList: string;
}

export interface WordHistory {
  word: string;
  translation: string;
  errors: number[];
}