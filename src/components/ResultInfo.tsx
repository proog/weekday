import { isSameDay } from "date-fns";
import { DayKindFormatter } from "../lib/DayKindFormatter";
import { CalculationResult, DayKind } from "../lib/models";

const kindFormatter = new DayKindFormatter();

interface Props {
  result: CalculationResult;
}

function ResultInfo({ result }: Props) {
  const listItems = result.days.map((day) => {
    const isHoliday =
      day.kind !== DayKind.Weekday && day.kind !== DayKind.Weekend;

    let className = "";
    if (isSameDay(day.date, result.resultingDate)) {
      className = "fw-bold";
    } else if (day.kind !== DayKind.Weekday) {
      className = "text-danger";
    }

    return (
      <li key={day.date.toISOString()} className={className}>
        {day.date.toLocaleDateString()}
        {isHoliday ? ` (${kindFormatter.format(day.kind)})` : null}
      </li>
    );
  });

  return (
    <>
      <h2>Resultat</h2>
      <p>
        {result.numberOfDays} hverdage{" "}
        {result.direction === "before" ? "før" : "efter"}{" "}
        {result.inputDate.toLocaleDateString()} er{" "}
        <span className="fw-bold">
          {result.resultingDate.toLocaleDateString()}
        </span>
      </p>
      <ul className="list-unstyled">{listItems}</ul>
    </>
  );
}

export default ResultInfo;
