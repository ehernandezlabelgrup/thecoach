import { useRef, useState, useEffect } from "react";
import { useCalendar } from "../../context/CalendarContext/CalendarContext";

interface IProps {
  data: string;
  enable: boolean;
}

const SIZE = {
  small: "h-20",
  large: "h-32",
};

const InputDescription = ({ data, enable, size = "small" }: IProps) => {
  const { truncate } = useCalendar();
  const refInput = useRef<HTMLTextAreaElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (data) setLines(data.split("\n"));
  }, [data]);

  const renderTruncatedContent = () => {
    if (truncate) {
      return (
        <p className="truncate">
          {lines[0]}
          {lines.length > 1 && "..."}
        </p>
      );
    } else {
      if (lines.length <= 3) {
        return lines.map((item, index) => (
          <p key={index} className="truncate">
            {item}
          </p>
        ));
      } else {
        return (
          <>
            {lines.slice(0, 3).map((item, index) => (
              <p key={index} className="">
                {item}
              </p>
            ))}
            <p className="truncate">...</p>
          </>
        );
      }
    }
  };

  return enable ? (
    <div>
      <textarea
        ref={refInput}
        className={`w-full ${SIZE[size]} transition-all resize-none px-2 border border-transparent outline-none focus:border-blue-500 text-xs bg-transparent`}
        defaultValue={data}
      />
    </div>
  ) : (
    <div
      onClick={() => {
        setTimeout(() => {
          if (refInput.current) {
            refInput.current.focus();
          }
        }, 300);
      }}
      className="text-xs px-2 text-gray-500"
    >
      {renderTruncatedContent()}
    </div>
  );
};

export default InputDescription;
