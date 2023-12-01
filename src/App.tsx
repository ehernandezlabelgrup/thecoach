import { useEffect, useState } from "react"
import Calendar from "./components/Calendar"
import { CalendarNav } from "./components/CalendarNav/CalendarNav"
import WeeksLabels from "./components/WeeksLabels"
import { createWeeks } from "./utils/calendar"
import { Week } from "./interfaces/calendarTypes"
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


const DATA = [
    {
        "id_program": 1,
        "title": "Session 1",
        "rest_day": false,
        "warmup": "\n2 Round\n- 30'' Downward Dog Stretch\n- 30'' Downward Dog HSPU\n- 30'' Instep Stretch (R)\n- 30'' Instep Stretch (L)",
        "date": "2023-12-01",
        "position": 1,
        "notes": "",
        "cooldown": "\n2 Round\n- 30'' Downward Dog Stretch\n- 30'' Downward Dog HSPU\n- 30'' Instep Stretch (R)\n- 30'' Instep Stretch (L)",
        workout_items: [
            {
                "id_workout": 1208,
                "notes": "",
                "id_program": 1,
                "name": "5 rounds for quality",
                "info": "- 5 shoulder press @RIR 1-2\n- 10/10 split squats @2x db (heavy)\n- 8 barbell good morning",
                "is_circuit": false,
                "position": 1,
                "date_add": "2023-10-22 22:57:02",
                "date_upd": "2023-10-30 21:51:49",
                "id_exercise_selected": 0,
                "id_thetraktor_type_mark": 1,
                "id_workout_category": 0,
                "exercises": [
                    {
                        "id": 50,
                        "name": "Split Squat w/Front Foot Elevated",
                        "video": "https://dycqnxcaay2f4.cloudfront.net/v_50-transcoded.mp4",
                        "type_mark": null,
                        "active_in_marks": "0",
                        "active": "1",
                        "date_add": "2023-05-03 09:19:52",
                        "date_upd": "2023-05-03 09:19:52",
                        "id_shop_list": [],
                        "force_id": false
                    },
                    {
                        "id": 246,
                        "name": "Good Morning w/Barbell",
                        "video": "https://dycqnxcaay2f4.cloudfront.net/v_246-transcoded.mp4",
                        "type_mark": "1",
                        "active_in_marks": "0",
                        "active": "1",
                        "date_add": "2023-08-27 20:39:16",
                        "date_upd": "2023-08-27 20:39:16",
                        "id_shop_list": [],
                        "force_id": false
                    }
                ],
                "is_ranking": false,
                "min_result": "0",
                "id": 2438,
                "id_shop_list": [],
                "force_id": false
            },
            {
                "id_workout": 1208,
                "notes": "Anota la carga realizada en el apartado 3.",
                "id_program": 1,
                "name": "Front squat",
                "info": "1: 3x3 Deadstop @70-75%\n2: 3x4 @RIR 2\n3: 2x2 @RIR 1",
                "is_circuit": false,
                "position": 2,
                "date_add": "2023-10-22 22:57:02",
                "date_upd": "2023-10-30 21:51:49",
                "id_exercise_selected": 0,
                "id_thetraktor_type_mark": 3,
                "id_workout_category": 18,
                "exercises": [],
                "is_ranking": false,
                "min_result": "110",
                "id": 2439,
                "id_shop_list": [],
                "force_id": false
            },
            {
                "id_workout": 1208,
                "notes": "Round of Macho Man:\n- 3 power clean\n- 3 front squat\n- 3 push jerks",
                "id_program": 1,
                "name": "For time",
                "info": "- 5 rounds of Macho Man @80/57kg\n- 20 bar facing burpees\n\n90'' rest\n\n- 4 rounds of Macho Man\n- 20 bar facing burpees\n\n90'' rest\n\n- 3 rounds of Macho Man\n- 20 bar facing burpees\n\n90'' rest\n\n- 2 rounds of Macho Man\n- 20 bar facing burpees\n\n90'' rest\n\n- 1 round of Macho Man\n- 20 bar facing burpees",
                "is_circuit": false,
                "position": 3,
                "date_add": "2023-10-22 22:57:02",
                "date_upd": "2023-10-30 21:51:49",
                "id_exercise_selected": 0,
                "id_thetraktor_type_mark": 1,
                "id_workout_category": 16,
                "exercises": [],
                "is_ranking": true,
                "min_result": "",
                "id": 2440,
                "id_shop_list": [],
                "force_id": false
            }
        ],
        "id_workout_category": "0",
        "date_add": "2023-10-22 22:57:02",
        "date_upd": "2023-10-30 21:51:49",
        "exercises": [
            {
                "id": 46,
                "name": "Jump Squat",
                "video": "https://dycqnxcaay2f4.cloudfront.net/v_246-transcoded.mp4",
                "type_mark": null,
                "active_in_marks": "0",
                "active": "1",
                "date_add": "2023-05-03 09:15:45",
                "date_upd": "2023-05-03 09:15:45",
                "id_shop_list": [],
                "force_id": false
            },
            {
                "id": 111,
                "name": "Downward Dog Stretch",
                "video": "",
                "type_mark": null,
                "active_in_marks": "0",
                "active": "1",
                "date_add": "2023-07-30 08:14:53",
                "date_upd": "2023-07-30 08:14:53",
                "id_shop_list": [],
                "force_id": false
            },
            {
                "id": 110,
                "name": "Downward Dog HSPU",
                "video": "",
                "type_mark": null,
                "active_in_marks": "0",
                "active": "1",
                "date_add": "2023-07-30 08:14:35",
                "date_upd": "2023-07-30 08:14:35",
                "id_shop_list": [],
                "force_id": false
            },
            {
                "id": 250,
                "name": "Instep Stretch",
                "video": "",
                "type_mark": "1",
                "active_in_marks": "0",
                "active": "1",
                "date_add": "2023-08-27 20:40:45",
                "date_upd": "2023-08-27 20:40:45",
                "id_shop_list": [],
                "force_id": false
            }
        ],

        
      
        "id": 1208,
        "id_shop_list": [],
        "force_id": false
      }
]

const App = () => {
  const [loading] = useState<boolean>(false)
  const [date, setDate] = useState<Date>(new Date())
  const [weeks, setWeeks] = useState<Week[]>([])
  const [truncate, setTruncate] = useState<boolean>(false)
  useEffect(() => {
    setWeeks(createWeeks(date as Date) as Week[])
  }, [])
    return (
        <div className="app container trainerFrame has-trackableTable grow-1 h-full w-full relative ">
              <ToastContainer position="top-center"/>
            <div className="flex trainerFrame-wrap absolute h-full w-full top-0 right-0 ">
                <div className="has-calendar trainerFrame-main ember-view">
                <CalendarNav setTruncate={setTruncate} setDate={setDate} date={date} loading={loading} truncate={truncate} />
                <div className='trainerFrame-calendarWrap  is-small'>
                    <WeeksLabels />
                    <Calendar truncate={truncate} data={DATA} weeks={weeks}  />
                </div>
                </div>
            </div>
        </div>
    )
}

export default App
