import { DayKind } from "./models";

export class DayKindFormatter {
  format(kind: DayKind): string {
    switch (kind) {
      case DayKind.Weekday:
        return "Hverdag";
      case DayKind.Weekend:
        return "Weekend";
      case DayKind.AscensionDay:
        return "Kristi himmelfartsdag";
      case DayKind.GreatPrayerDay:
        return "Store bededag";
      case DayKind.ChristmasDay:
        return "1. juledag";
      case DayKind.SecondChristmasDay:
        return "2. juledag";
      case DayKind.ChristmasEve:
        return "Juleaftensdag";
      case DayKind.ConstitutionDay:
        return "Grundlovsdag";
      case DayKind.EasterSunday:
        return "Påskedag";
      case DayKind.EasterMonday:
        return "2. påskedag";
      case DayKind.MaundyThursday:
        return "Skærtorsdag";
      case DayKind.GoodFriday:
        return "Langfredag";
      case DayKind.MayFirst:
        return "1. maj";
      case DayKind.NewYearsDay:
        return "Nytårsdag";
      case DayKind.NewYearsEve:
        return "Nytårsaftensdag";
      case DayKind.PentecostSunday:
        return "Pinsedag";
      case DayKind.PentecostMonday:
        return "2. pinsedag";
      default:
        return "Ukendt";
    }
  }
}
