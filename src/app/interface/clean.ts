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
