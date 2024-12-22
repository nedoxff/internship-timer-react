import { useRef } from 'react';
import './App.scss'
import Timer from './components/Timer'
import ThemeSwitch from './components/ThemeSwitch';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} id="contents-container">
      <div>
        <h1>nedotimer</h1>
        <Timer setAlarm={(alarm) => {
          if(alarm) containerRef.current?.classList.add("alarm");
          else containerRef.current?.classList.remove("alarm");
        }}/>
      </div>

      <div id='info-container'>
        <ThemeSwitch/>
      </div>
    </div>
  )
}

export default App