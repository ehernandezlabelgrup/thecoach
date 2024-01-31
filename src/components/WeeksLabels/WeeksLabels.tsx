import dayjs from "dayjs"
import "dayjs/locale/es" // Importa el locale español
import "./styles.css"

dayjs.locale("es")

export const WeeksLabels = () => {
  const weekDays = Array(7)
    .fill(0)
    .map((_, i) =>
      dayjs()
        .day(i + 1)
        .format("ddd"),
    )
  return (
    <div className="week font-hongkong  week--labels trainerFrame-weeks">
      <div className="week-days">
        {weekDays.map((day, index) => (
          <div key={index} className="week-label">
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}
