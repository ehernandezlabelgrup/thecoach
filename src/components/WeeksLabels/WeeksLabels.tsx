import dayjs from 'dayjs'
import 'dayjs/locale/es' // Importa el locale español
import './styles.css'

export const WeeksLabels = () => {

  dayjs.locale('es')

  const weekDays = Array(7)
    .fill(0)
    .map((_, i) => dayjs().day(i).format('ddd'))

  return (
    <div className="week font-hongkong  week--labels trainerFrame-weeks">
      <div className="week-days">
        {weekDays.map((day, index) => (
          <div key={index} className="week-label">{day}</div>
        ))}
      </div>
    </div>
  )
}
