import { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";
import './TimerInput.scss';

export interface TimerInputRef {
    getUserTime: () => string;
    setUserTime: (value: string) => void;
    setEnabled: (enabled: boolean) => void;
}

const TimerInput = forwardRef((_props, ref: Ref<TimerInputRef>) => {
    const [userTime, setUserTime] = useState("000000");
    const inputRef = useRef<HTMLInputElement>(null);
    const [enabled, setEnabled] = useState(true);

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key >= '0' && e.key <= '9') setUserTime(userTime.substring(1) + e.key);
        else if (e.key === 'Backspace' || e.key === 'Delete') setUserTime('0' + userTime.substring(0, 5));
    };

    const moveCursorToEnd = () => {
        if (inputRef.current === null) return;
        const length = inputRef.current.value.length;
        inputRef.current.focus();
        inputRef.current.setSelectionRange(length, length);
    };

    useImperativeHandle(ref, () => ({ getUserTime: () => userTime, 
        setUserTime: setUserTime, 
        setEnabled: setEnabled }));

    return <input minLength={8}
        maxLength={8}
        value={userTime.substring(0, 2) + ":" + userTime.substring(2, 4) + ":" + userTime.substring(4)}
        onKeyDown={onInputKeyDown}
        onClick={moveCursorToEnd}
        ref={inputRef}
        inputMode="numeric" disabled={!enabled} />;
});

export default TimerInput