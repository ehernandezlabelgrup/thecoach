interface IProps {
  Icon: React.ComponentType<{ className: string }>;
  size: string;
  onClick?: () => void;
}

const DayActionButton = ({ Icon, size, onClick }: IProps) => (
  <button
    onClick={onClick}
    className="w-6/12 hover:bg-gray-300 h-12 transition-all flex items-center justify-center"
  >
    <div className={size}>
      <Icon className="fill-slate-500" />
    </div>
  </button>
);

export default DayActionButton;
