import { Icon } from '@iconify/react/dist/iconify.js';
import './SavedTimeCard.scss';

interface SavedTimeCardProps {
    time: string;
    onRemove: () => void;
}

export default function SavedTimeCard(props: SavedTimeCardProps) {
    return <div className="saved-time-card">
    <div>
        <Icon width="18" icon="material-symbols:nest-clock-farsight-analog-outline-rounded"/>
        <p>{props.time.substring(0, 2)}:
            {props.time.substring(2, 4)}:
            {props.time.substring(4)}</p>
    </div>
    <button onClick={props.onRemove}><Icon width="18" icon="material-symbols:delete-outline-rounded"/></button>
    </div>
}