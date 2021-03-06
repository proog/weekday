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

export interface DayDefinition {
  date: Date;
  kind: DayKind;
}

export interface CalculationResult {
  resultingDate: Date;
  days: DayDefinition[];
  inputDate: Date;
  direction: "before" | "after";
  numberOfDays: number;
}
