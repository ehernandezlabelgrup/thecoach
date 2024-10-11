import "./App.css";
import Calendar from "./components/Calendar";
import "toastify-js/src/toastify.css";
import CalendarProvider from "./context/CalendarContext";
import { NextUIProvider } from "@nextui-org/system";

interface IProps {
  id_program: string;
  base_url: string;
}

const App = ({ id_program, base_url }: IProps) => {
  return (
    <NextUIProvider>
      <CalendarProvider base_url={base_url} id_program={id_program}>
        <Calendar />
      </CalendarProvider>
    </NextUIProvider>
  );
};

export default App;
