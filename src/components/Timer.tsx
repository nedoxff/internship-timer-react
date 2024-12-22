import { useEffect, useMemo, useRef, useState } from "react";
import './Timer.scss';
import TimerInput, { TimerInputRef } from "./TimerInput";
import CustomButton from "./CustomButton";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import SavedTimeCard from "./SavedTimeCard";

export interface TimerProps {
    setAlarm: (alarm: boolean) => void;
}

function Timer(props: TimerProps) {
    const inputRef = useRef<TimerInputRef>(null);
    const alarmRef = useRef<HTMLAudioElement>(null);

    const [savedTimes, setSavedTimes] = useState<string[]>([]);

    const [intervalId, setIntervalId] = useState(-1);
    const [paused, setPaused] = useState(false);
    const [alarmPlaying, setAlarmPlaying] = useState(false);

    const [targetDate, setTargetDate] = useState<Date | null>(null);
    const [pauseDate, setPauseDate] = useState<Date | null>(null);

    const started = useMemo(() => targetDate !== null, [targetDate]);

    const startTimer = () => {
        if (inputRef.current === null) return;
        const userTime = inputRef.current.getUserTime();
        if (userTime == "000000") return;

        let hours = parseInt(userTime.substring(0, 2));
        let minutes = parseInt(userTime.substring(2, 4));
        let seconds = parseInt(userTime.substring(4));

        // overflow
        if (seconds >= 59 && minutes >= 59 && hours >= 99) {
            hours = 99; minutes = 59; seconds = 59;
        }
        setTargetDate(dayjs().add(hours, 'hours').add(minutes, 'minutes').add(seconds, 'seconds').toDate());
    }

    const countdown = () => {
        if (inputRef.current === null) return;
        const difference = dayjs.duration(dayjs(targetDate).diff());
        inputRef.current.setUserTime(
            (difference.days() * 24 + difference.hours()).toString().padStart(2, '0') +
            difference.minutes().toString().padStart(2, '0') +
            difference.seconds().toString().padStart(2, '0'));
        if (difference.milliseconds() < 0) setAlarmPlaying(true);
    };

    useEffect(() => {
        dayjs.extend(duration);
    }, []);

    useEffect(() => {
        inputRef.current?.setEnabled(!started);
    }, [started]);

    useEffect(() => {
        if (intervalId === -1 && targetDate !== null) {
            setIntervalId(setInterval(countdown, 1000));
            countdown();
        }
    }, [targetDate]);

    useEffect(() => {
        if (!started) return;
        if (paused) {
            clearInterval(intervalId);
            setIntervalId(-1);
            setPauseDate(new Date());
        }
        else {
            const difference = dayjs().diff(pauseDate);
            setTargetDate(dayjs(targetDate).add(difference, 'milliseconds').toDate());
        }
    }, [paused]);

    useEffect(() => {
        if (alarmRef.current === null) return;
        if (alarmPlaying) {
            clearInterval(intervalId);
            alarmRef.current.volume = 0.5;
            alarmRef.current?.play();
        }
        props.setAlarm(alarmPlaying);
    }, [alarmPlaying]);

    const reset = () => {
        clearInterval(intervalId);
        setTargetDate(null);
        setPauseDate(null);
        setPaused(false);
        setIntervalId(-1);
        setSavedTimes([]);
        setAlarmPlaying(false);
        if (alarmRef.current !== null) {
            alarmRef.current.pause();
            alarmRef.current.currentTime = 0;
        }
        inputRef.current?.setUserTime("000000");
    }

    return (<div id="timer-container">
        <TimerInput ref={inputRef} />
        <div id="timer-controls">
            {!started && <CustomButton onClick={startTimer} icon="material-symbols:play-arrow-rounded">start</CustomButton>}
            {started && !alarmPlaying &&
                (paused ? <CustomButton onClick={() => setPaused(false)} icon="material-symbols:resume-rounded">resume</CustomButton>
                    : <CustomButton onClick={() => setPaused(true)} icon="material-symbols:pause-rounded">pause</CustomButton>)}
            {started && !alarmPlaying && <CustomButton onClick={() => setSavedTimes([...savedTimes, inputRef.current!.getUserTime()])} icon="material-symbols:save-clock-outline-rounded">save</CustomButton>}
            {started && <CustomButton onClick={reset} icon="material-symbols:device-reset-rounded">reset</CustomButton>}
        </div>
        <div id="saved-times">
                {savedTimes?.map((time: string, idx: number) => 
                    (<SavedTimeCard 
                        time={time} 
                    onRemove={() => setSavedTimes([...savedTimes.slice(0, idx), ...savedTimes.slice(idx + 1)])}/>))}
        </div>
        <audio loop src="alarm.mp3" ref={alarmRef} />
    </div>)
}

export default Timer