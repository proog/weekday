import { Calculator } from "./Calculator";
import { DayKind } from "./models";

let calculator: Calculator;

beforeEach(() => {
  calculator = new Calculator();
});

describe("getBusinessDaysAfter", () => {
  test("should account for weekends when counting forwards", () => {
    const start = new Date(2021, 4, 1);
    const result = calculator.getBusinessDaysAfter(start, 4);

    expect(result.days.length).toBe(6);
    expect(result.resultingDate).toEqual(new Date(2021, 4, 6));
  });

  test("should account for holidays when counting forwards", () => {
    const start = new Date(2021, 4, 20);
    const result = calculator.getBusinessDaysAfter(start, 10);

    expect(result.days.length).toBe(15);
    expect(result.resultingDate).toEqual(new Date(2021, 5, 3));
  });

  test("should account for extra holidays if enabled", () => {
    calculator = new Calculator([DayKind.ChristmasEve]);
    const start = new Date(2021, 11, 22);
    const result = calculator.getBusinessDaysAfter(start, 4);

    expect(result.days.length).toBe(7);
    expect(result.resultingDate).toEqual(new Date(2021, 11, 28));
  });
});

describe("getBusinessDaysBefore", () => {
  test("should account for weekends when counting backwards", () => {
    const end = new Date(2021, 3, 27);
    const result = calculator.getBusinessDaysBefore(end, 4);

    expect(result.days.length).toBe(6);
    expect(result.resultingDate).toEqual(new Date(2021, 3, 22));
  });

  test("should account for holidays when counting backwards", () => {
    const end = new Date(2021, 4, 14);
    const result = calculator.getBusinessDaysBefore(end, 8);

    expect(result.days.length).toBe(11);
    expect(result.resultingDate).toEqual(new Date(2021, 4, 4));
  });
});
