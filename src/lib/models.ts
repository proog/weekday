export enum DayKind {
  Weekday,
  Weekend,
  NewYearsDay,
  MaundyThursday,
  GoodFriday,
  EasterSunday,
  EasterMonday,
  MayFirst,
  GreatPrayerDay,
  AscensionDay,
  PentecostSunday,
  PentecostMonday,
  ConstitutionDay,
  ChristmasEve,
  ChristmasDay,
  SecondChristmasDay,
  NewYearsEve,
}

export type DayDefinition = {
  date: Date;
  kind: DayKind;
};

export interface CalculationResult {
  resultingDate: Date;
  days: DayDefinition[];
}
