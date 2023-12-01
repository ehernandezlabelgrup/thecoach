import React from 'react'
import dayjs from 'dayjs'
import Pikaday from 'pikaday'
import 'pikaday/css/pikaday.css'
import './styles.css'
import { useEffect, useRef, useState } from 'react'
import ForwardIcon from '../Icons/ForwardIcon'
import BackIcon from '../Icons/BackIcon'
import CaretDownIcon from '../Icons/CaretDownIcon'

interface Props{
  loading:boolean
  date:Date
  setDate:(date:Date)=>void
  truncate:boolean
  setTruncate:(t:boolean)=>void
}

export const CalendarNav = ({loading, date, setDate, truncate, setTruncate}: Props) => {
  const dateInputRef: React.RefObject<HTMLInputElement> = useRef(null)
  const pikadayRef = useRef<Pikaday | null>(null)
  const [currentMonth, setCurrentMonth] = useState<string>(dayjs(new Date()).format('MMMM YYYY'))

  const handleTodayClick = () => {
    const today = new Date()
    setDate(today)

    if (pikadayRef.current) {
      pikadayRef.current.setDate(today)
    }

    const monthYear = dayjs(today).format('MMMM YYYY')
    setCurrentMonth(monthYear)
  }

  useEffect(() => {
    if (dateInputRef.current) {
      const pickdayInstance = new Pikaday({
        field: dateInputRef.current,
        showMonthAfterYear: true,
        showDaysInNextAndPreviousMonths: true,
        enableSelectionDaysInNextAndPreviousMonths: true,
        numberOfMonths: 1,
        defaultDate: date,
        onSelect: (date: Date) => {
          setDate(date)
          const monthYear = dayjs(date).format('MMMM YYYY')
          setCurrentMonth(monthYear)
        },
      })
      pikadayRef.current = pickdayInstance
    }

    return () => {
      if (pikadayRef.current) {
        pikadayRef.current.destroy()
      }
    }
  }, [])

  return (
    <nav className={`calendarNav font-hongkong  flex justify-between p-2 ${loading ? 'is-loading' : ''}`}>
      <div className='flex'>
      <div   className="flex items-center relative mr-4">
        <button 
        disabled={loading}
        onClick={handleTodayClick} className="border px-5 py-1 h-8 bg-transparent rounded rounded-r-none cursor-pointer text-xs text-center border-[#d1ceda] border-r-0 relative z-10">
            Today
        </button>
          <div ref={dateInputRef} className='w-full h-full absolute top-0 left-0 '/>
        <button
        disabled={loading}
        className="px-2 py-2 flex items-center rounded rounded-l-none h-8 bg-transparent border border-[#d1ceda]   cursor-pointer" id='open-picker' >
          <CaretDownIcon />
        </button>
      </div>
      <button
      disabled={loading}
      className="h-9 mr-1 w-7 items-center inline-flex justify-center" data-test="back-month-button" type="button">
        <BackIcon />
      </button>
      <button
      disabled={loading}
      className="ml-1 w-7 flex items-center  justify-center" data-test="forward-month-button" type="button">
        <ForwardIcon />
      </button>
      <h2 className="calendarNav-title text-2xl nudge nudge--1  h-9 flex items-center ml-4">
        <div id="ember4545" className="liquid-container ember-view">
          <div id="ember4547" className="liquid-child ember-view capitalize" style={{ top: '0px', left: '0px' }}>
          {currentMonth}
          </div>
        </div>
      </h2>
      </div>
      <div>
      <input
  className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
  type="checkbox"
  role="switch"
  id="flexSwitchCheckDefault" 
  checked={truncate}
  onChange={(e)=>setTruncate(e.target.checked)}
  />
<label
  className="inline-block pl-[0.15rem] hover:cursor-pointer"
  htmlFor="flexSwitchCheckDefault"
  >Truncate</label>
      </div>
    </nav>
  )
}
