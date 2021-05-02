import { HolidayCalculator } from "./HolidayCalculator";
import { DayKind } from "./models";

let calculator: HolidayCalculator;

beforeEach(() => {
  calculator = new HolidayCalculator();
});

describe("mandatory holidays", () => {
  test("should calculate new year's day", () => {
    const day = calculator.getDayDefinition(new Date(2021, 0, 1));
    expect(day.kind).toBe(DayKind.NewYearsDay);
  });

  test("should calculate maundy thursday", () => {
    const day = calculator.getDayDefinition(new Date(2021, 3, 1));
    expect(day.kind).toBe(DayKind.MaundyThursday);
  });

  test("should calculate good friday", () => {
    const day = calculator.getDayDefinition(new Date(2021, 3, 2));
    expect(day.kind).toBe(DayKind.GoodFriday);
  });

  test("should calculate easter", () => {
    const day = calculator.getDayDefinition(new Date(2021, 3, 4));
    expect(day.kind).toBe(DayKind.EasterSunday);
  });

  test("should calculate easter monday", () => {
    const day = calculator.getDayDefinition(new Date(2021, 3, 5));
    expect(day.kind).toBe(DayKind.EasterMonday);
  });

  test("should calculate great prayer day", () => {
    const day = calculator.getDayDefinition(new Date(2021, 3, 30));
    expect(day.kind).toBe(DayKind.GreatPrayerDay);
  });

  test("should calculate ascension day", () => {
    const day = calculator.getDayDefinition(new Date(2021, 4, 13));
    expect(day.kind).toBe(DayKind.AscensionDay);
  });

  test("should calculate pentecost", () => {
    const day = calculator.getDayDefinition(new Date(2021, 4, 23));
    expect(day.kind).toBe(DayKind.PentecostSunday);
  });

  test("should calculate pentecost monday", () => {
    const day = calculator.getDayDefinition(new Date(2021, 4, 24));
    expect(day.kind).toBe(DayKind.PentecostMonday);
  });

  test("should calculate christmas day", () => {
    const day = calculator.getDayDefinition(new Date(2021, 11, 25));
    expect(day.kind).toBe(DayKind.ChristmasDay);
  });

  test("should calculate second christmas day", () => {
    const day = calculator.getDayDefinition(new Date(2021, 11, 26));
    expect(day.kind).toBe(DayKind.SecondChristmasDay);
  });
});

describe("optional holidays", () => {
  test("should not treat May 1st specially if not enabled", () => {
    const day = calculator.getDayDefinition(new Date(2021, 4, 1));
    expect(day.kind).toBe(DayKind.Weekend);
  });

  test("should calculate May 1st if enabled", () => {
    calculator = new HolidayCalculator([DayKind.MayFirst]);
    const day = calculator.getDayDefinition(new Date(2021, 4, 1));
    expect(day.kind).toBe(DayKind.MayFirst);
  });

  test("should not treat constitution day specially if not enabled", () => {
    const day = calculator.getDayDefinition(new Date(2021, 5, 5));
    expect(day.kind).toBe(DayKind.Weekend);
  });

  test("should calculate constitution day if enabled", () => {
    calculator = new HolidayCalculator([DayKind.ConstitutionDay]);
    const day = calculator.getDayDefinition(new Date(2021, 5, 5));
    expect(day.kind).toBe(DayKind.ConstitutionDay);
  });

  test("should not treat christmas eve specially if not enabled", () => {
    const day = calculator.getDayDefinition(new Date(2021, 11, 24));
    expect(day.kind).toBe(DayKind.Weekday);
  });

  test("should calculate christmas eve if enabled", () => {
    calculator = new HolidayCalculator([DayKind.ChristmasEve]);
    const day = calculator.getDayDefinition(new Date(2021, 11, 24));
    expect(day.kind).toBe(DayKind.ChristmasEve);
  });

  test("should not treat new year's eve specially if not enabled", () => {
    const day = calculator.getDayDefinition(new Date(2021, 11, 31));
    expect(day.kind).toBe(DayKind.Weekday);
  });

  test("should calculate new year's eve if enabled", () => {
    calculator = new HolidayCalculator([DayKind.NewYearsEve]);
    const day = calculator.getDayDefinition(new Date(2021, 11, 31));
    expect(day.kind).toBe(DayKind.NewYearsEve);
  });
});
