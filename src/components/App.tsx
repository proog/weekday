import { format, startOfToday } from "date-fns";
import { useState } from "react";
import { Calculator } from "../lib/Calculator";
import { DayKindFormatter } from "../lib/DayKindFormatter";
import { CalculationResult, DayKind } from "../lib/models";
import ResultInfo from "./ResultInfo";

const formatter = new DayKindFormatter();
const optionalExtraHolidays = [
  DayKind.MayFirst,
  DayKind.ChristmasEve,
  DayKind.NewYearsEve,
];

function App() {
  const [inputDate, setInputDate] = useState(startOfToday());
  const [numberOfDays, setNumberOfDays] = useState("10");
  const [mode, setMode] = useState("after" as "before" | "after");
  const [extraHolidays, setExtraHolidays] = useState([] as DayKind[]);
  const [calculationResult, setCalculationResult] = useState(
    null as CalculationResult | null
  );

  function toggleExtraHoliday(kind: DayKind, checked: boolean) {
    setExtraHolidays(
      checked
        ? [...extraHolidays, kind]
        : extraHolidays.filter((x) => x !== kind)
    );
  }

  function calculate() {
    const numberOfDaysAsNumber = parseInt(numberOfDays, 10);

    if (isNaN(numberOfDaysAsNumber)) return;

    const calculator = new Calculator(extraHolidays);
    const result =
      mode === "after"
        ? calculator.getBusinessDaysAfter(inputDate, numberOfDaysAsNumber)
        : calculator.getBusinessDaysBefore(inputDate, numberOfDaysAsNumber);
    setCalculationResult(result);
  }

  return (
    <div className="container">
      <h1>Arbejdsdagsberegner</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
      >
        <div className="mb-3">
          <label htmlFor="inputDate" className="form-label">
            Startdato
          </label>
          <input
            type="date"
            id="inputDate"
            className="form-control"
            required
            value={format(inputDate, "yyyy-MM-dd")}
            onChange={(e) => setInputDate(new Date(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="numberOfDays" className="form-label">
            Antal arbejdsdage
          </label>
          <input
            type="number"
            id="numberOfDays"
            className="form-control"
            min="0"
            required
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input
              type="radio"
              name="direction"
              id="directionAfter"
              className="form-check-input"
              value="after"
              checked={mode === "after"}
              onChange={() => setMode("after")}
            />
            <label htmlFor="directionAfter" className="form-check-label">
              Efter datoen
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="direction"
              id="directionBefore"
              className="form-check-input"
              value="before"
              checked={mode === "before"}
              onChange={() => setMode("before")}
            />
            <label htmlFor="directionBefore" className="form-check-label">
              Før datoen
            </label>
          </div>
        </div>

        <div className="mb-3">
          {optionalExtraHolidays.map((kind) => (
            <div className="form-check" key={kind}>
              <input
                type="checkbox"
                id={`extra${kind}`}
                className="form-check-input"
                checked={extraHolidays.includes(kind)}
                onChange={(e) => toggleExtraHoliday(kind, e.target.checked)}
              />
              <label htmlFor={`extra${kind}`} className="form-check-label">
                {formatter.format(kind)}
              </label>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Beregn
          </button>
        </div>
      </form>

      {calculationResult && <ResultInfo result={calculationResult} />}
    </div>
  );
}

export default App;
