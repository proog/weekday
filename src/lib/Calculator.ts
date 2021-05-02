import { addDays } from "date-fns";
import { HolidayCalculator } from "./HolidayCalculator";
import { CalculationResult, DayDefinition, DayKind } from "./models";

export class Calculator {
  private readonly holidayCalculator: HolidayCalculator;

  constructor(extraHolidays: DayKind[] = []) {
    this.holidayCalculator = new HolidayCalculator(extraHolidays);
  }

  getBusinessDaysBefore(end: Date, numberOfDays: number) {
    return this.getBusinessDays(end, numberOfDays, -1);
  }

  getBusinessDaysAfter(start: Date, numberOfDays: number) {
    return this.getBusinessDays(start, numberOfDays, 1);
  }

  private getBusinessDays(
    base: Date,
    numberOfDays: number,
    direction: -1 | 1
  ): CalculationResult {
    const days: DayDefinition[] = [];
    let currentDate = base;
    let numberOfDaysReached = 0;

    while (true) {
      const day = this.holidayCalculator.getDayDefinition(currentDate);
      days.push(day);

      if (day.kind === DayKind.Weekday) {
        numberOfDaysReached++;
      }

      if (numberOfDaysReached === numberOfDays) {
        break;
      }

      currentDate = addDays(currentDate, direction);
    }

    return { days, resultingDate: currentDate };
  }
}
