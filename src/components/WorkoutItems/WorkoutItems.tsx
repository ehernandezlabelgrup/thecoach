import { useRef, useState } from "react";
import InputDescription from "../InputDescription";

const WorkoutItem = ({ name, letter, info, enable }) => {
  const [inputIsFocus, setInputIsFocus] = useState(false);
  const refInput = useRef();
  return (
    <div className="gap-1 flex flex-col mt-2">
      <div
        onClick={(e) => {
          setTimeout(() => {
            refInput.current.focus();
          }, 300);
        }}
        className={`px-2 ${inputIsFocus ? "bg-slate-200" : ""}`}
      >
        <div className="flex items-center cursor-pointer flex-row gap-2 text-gray-600 font-bold">
          <div className="text-sm">{letter})</div>
          {enable ? (
            <input
              ref={refInput}
              onFocus={() => setInputIsFocus(true)}
              onBlur={() => setInputIsFocus(false)}
              className="text-sm text-gray-500 py-2 bg-transparent outline-none"
            />
          ) : (
            <div className="text-sm text-gray-500">{name}</div>
          )}
        </div>
      </div>
      <InputDescription size="large" data={info} enable={enable} />
    </div>
  );
};

const WorkoutItems = ({ items, enable }) => {
  return items.map((item, index) => {
    const letter = getLetterFromIndex(index);
    return (
      <WorkoutItem enable={enable} {...item} letter={letter} key={index} />
    );
  });
};

export default WorkoutItems;
const getLetterFromIndex = (index: number): string => {
  return String.fromCharCode(65 + (index % 26));
};
