export interface DataChart {
  name: string;
  value: number;
  extra?: DataExtraChart;
}

export interface DataExtraChart {
  [key: string]: string;
}
