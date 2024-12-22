import { Icon } from '@iconify/react/dist/iconify.js';
import './SavedTimeCard.scss';
import dayjs from 'dayjs';

interface SavedTimeCardProps {
    time: number;
    onRemove: () => void;
}

export default function SavedTimeCard(props: SavedTimeCardProps) {
    const duration = dayjs.duration(props.time);

    return <div className="saved-time-card">
    <div>
        <Icon width="18" icon="material-symbols:nest-clock-farsight-analog-outline-rounded"/>
        <p>{duration.hours().toString().padStart(2, '0')}:
            {duration.minutes().toString().padStart(2, '0')}:
            {duration.seconds().toString().padStart(2, '0')}</p>
    </div>
    <button onClick={props.onRemove}><Icon width="18" icon="material-symbols:delete-outline-rounded"/></button>
    </div>
}