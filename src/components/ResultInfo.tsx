import { DayKindFormatter } from "../lib/DayKindFormatter";
import { CalculationResult, DayKind } from "../lib/models";

const kindFormatter = new DayKindFormatter();

type Props = { result: CalculationResult };

function ResultInfo({ result }: Props) {
  const listItems = result.days.map((day) => {
    const isHoliday =
      day.kind !== DayKind.Weekday && day.kind !== DayKind.Weekend;

    return (
      <li
        key={day.date.toISOString()}
        className={day.kind !== DayKind.Weekday ? "text-danger" : ""}
      >
        {day.date.toDateString()}
        {isHoliday ? ` (${kindFormatter.format(day.kind)})` : null}
      </li>
    );
  });

  return (
    <>
      <h2>Resultat</h2>
      <p className="fw-bold">{result.resultingDate.toDateString()}</p>
      <ul className="list-unstyled">{listItems}</ul>
    </>
  );
}

export default ResultInfo;
