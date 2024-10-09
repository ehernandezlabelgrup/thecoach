import './App.css';
import Calendar from './components/Calendar';
import "toastify-js/src/toastify.css"
import CalendarProvider from './context/CalendarContext';

const App = ()=> {
  return <CalendarProvider>
    <Calendar />
  </CalendarProvider>
}


export default App