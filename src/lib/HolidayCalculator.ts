import { addDays, isSameDay, isWeekend } from "date-fns";
import { DayDefinition, DayKind } from "./models";

export class HolidayCalculator {
  constructor(private readonly extraHolidays: DayKind[] = []) {}

  getDayDefinition(date: Date): DayDefinition {
    const holidays = this.calculateHolidays(date.getFullYear());
    const holiday = holidays.find((d) => isSameDay(d.date, date));

    if (holiday) {
      return holiday;
    }

    return {
      date,
      kind: isWeekend(date) ? DayKind.Weekend : DayKind.Weekday,
    };
  }

  calculateHolidays(year: number): DayDefinition[] {
    const easter = this.calculateEaster(year);
    const holidays = [
      {
        kind: DayKind.NewYearsDay,
        date: new Date(year, 0, 1),
      },
      {
        kind: DayKind.MaundyThursday,
        date: addDays(easter, -3),
      },
      {
        kind: DayKind.GoodFriday,
        date: addDays(easter, -2),
      },
      {
        kind: DayKind.EasterSunday,
        date: easter,
      },
      {
        kind: DayKind.EasterMonday,
        date: addDays(easter, 1),
      },
      {
        kind: DayKind.GreatPrayerDay,
        date: addDays(easter, 4 * 7 - 2),
      },
      {
        kind: DayKind.AscensionDay,
        date: addDays(easter, 6 * 7 - 3),
      },
      {
        kind: DayKind.PentecostSunday,
        date: addDays(easter, 7 * 7),
      },
      {
        kind: DayKind.PentecostMonday,
        date: addDays(easter, 7 * 7 + 1),
      },
      {
        kind: DayKind.ChristmasDay,
        date: new Date(year, 11, 25),
      },
      {
        kind: DayKind.SecondChristmasDay,
        date: new Date(year, 11, 26),
      },
    ];

    if (this.extraHolidays.includes(DayKind.MayFirst)) {
      holidays.push({
        kind: DayKind.MayFirst,
        date: new Date(year, 4, 1),
      });
    }
    if (this.extraHolidays.includes(DayKind.ConstitutionDay)) {
      holidays.push({
        kind: DayKind.ConstitutionDay,
        date: new Date(year, 5, 5),
      });
    }
    if (this.extraHolidays.includes(DayKind.ChristmasEve)) {
      holidays.push({
        kind: DayKind.ChristmasEve,
        date: new Date(year, 11, 24),
      });
    }
    if (this.extraHolidays.includes(DayKind.NewYearsEve)) {
      holidays.push({
        kind: DayKind.NewYearsEve,
        date: new Date(year, 11, 31),
      });
    }

    return holidays;
  }

  private calculateEaster(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const dayOfMonth = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, dayOfMonth);
  }
}
