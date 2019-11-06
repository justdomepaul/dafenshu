import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface Clean {
  area: number;
  rate: number;
  note: string;
  image: string[];
}

export interface MapArea {
  coords: number[];
  disabled?: boolean;
}

export interface DBClean {
  data: KeyDBClean;
}

export interface KeyDBClean {
  [key: string]: Clean[];
}

export interface ClassArea {
  ownArea: number[];
  name: string;
}

export interface HistoryData {
  name: string;
  scores: {
    scoresA: number,
    scoresB: number,
    scoresC: number,
  };
}

export interface MkQueryDocumentSnapshot extends QueryDocumentSnapshot<any> {
  fireData?: any;
  clean?: Clean[][];
  historyDatas?: HistoryData[];
}
