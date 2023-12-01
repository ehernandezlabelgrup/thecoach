import dayjs from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek"
import "dayjs/locale/es"

dayjs.extend(isoWeek)

/**
 * Calculates the weeks and days for a given month, including days from the adjacent months
 * if the month starts and/or ends in the middle of a week.
 *
 * @param {Date} date - The date object representing the month to be processed.
 * @returns {Array} An array of weeks, each week being an array of day objects containing the date and day name.
 */
export const createWeeks = (date: Date) => {
  dayjs.locale("es") 
  const startOfMonth = dayjs(date).startOf("month")
  const endOfMonth = dayjs(date).endOf("month")

  const startOfWeek = startOfMonth.startOf("isoWeek")
  const endOfWeek = endOfMonth.endOf("isoWeek")

  const weeks = []
  let week = []
  let currentDay = startOfWeek

  while (
    currentDay.isBefore(endOfWeek) ||
    currentDay.isSame(endOfWeek, "day")
  ) {
    week.push({
      date: currentDay.format("YYYY-MM-DD"),
      dayName: currentDay.format("MMM"),
      dayNumber: currentDay.format("D"),
      id: currentDay.isoWeek(),
    })

    if (currentDay.day() === 0) {
      weeks.push({
        id: currentDay.isoWeek(),
        days: week,
      })
      week = []
    }

    currentDay = currentDay.add(1, "day")
  }

  if (week.length > 0) {
    weeks.push(week)
  }

  return weeks
}
