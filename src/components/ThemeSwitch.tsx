import { useEffect, useState } from 'react';
import './ThemeSwitch.scss'
import { Icon } from '@iconify/react/dist/iconify.js';

export default function ThemeSwitch() {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        setDarkMode(document.documentElement.classList.contains("dark"));
    }, []);

    const changeMode = () => {
        if(darkMode) document.documentElement.classList.remove("dark");
        else document.documentElement.classList.add("dark");
        setDarkMode(!darkMode);
    }

    return <button onClick={changeMode} id='theme-switch-button'>
        {darkMode ? <Icon width={24} icon="material-symbols:dark-mode-rounded" />: <Icon width={24} icon="material-symbols:light-mode-rounded" />}
    </button>
}