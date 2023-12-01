
const DayLoading = () => {
  return (
    <div className="day week-day">
    <div data-test="day-header" className="day-topRow split split--nowrap">
        <div className="pr-3">
            &nbsp;
        </div>
    </div>
    <div className="m-3">
        <div className="bucket bucket--xs mb-1">
            <div className="preload preload--s preload--dot--s preload--bg bucket-media"></div>
            <div className="bucket-content">
                <div className="preload preload--s preload--bg mb-1" style={{ width: "100%" }}>
                </div>
            </div>
        </div>
        <div className="bucket bucket--xs mb-1">
            <div className="preload preload--s preload--dot--s preload--bg bucket-media"></div>
            <div className="bucket-content">
                <div className="preload preload--s preload--bg mb-1" style={{ width: "88%" }}>
                </div>
                <div className="preload preload--s preload--bg mb-1" style={{ width: "63%" }}>
                </div>
            </div>
        </div>
        <div className="bucket bucket--xs mb-1">
            <div className="preload preload--s preload--dot--s preload--bg bucket-media"></div>
            <div className="bucket-content">
                <div className="preload preload--s preload--bg mb-1" style={{ width: "49%" }}>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default DayLoading