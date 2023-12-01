import PasteIcon from "../../../Icons/PasteIcon"

const DayTopRow = ({name}: {name:string}) => {
  return (
    <div className="day-topRow split split--nowrap  is-sticky" data-test="day-header" style={{ top: '-1px' }}>
    <div className="pr-3 day-date">
      {/* Contenido aquí */}
    </div>
    <ul className="tc-list tc-list--inline tc-list--m-xs ">
      <li className="day-action tc-list-item  has-tooltip outline-none">
        <div className="law paste-workout">
          <PasteIcon />
        </div>
      </li>
      <li className="tc-list-item">
        <div className="law day-date cursor-pointer" data-test="set-active-day">
          <span data-test="day-number" className="day-number capitalize font-bold text-sm">
            {name}
          </span>
        </div>
      </li>
    </ul>
  </div>
  )
}

export default DayTopRow