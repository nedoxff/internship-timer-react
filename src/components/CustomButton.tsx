import './CustomButton.scss';
import { Icon } from "@iconify/react";

export interface CustomButtonProps {
    icon?: string;
    onClick?: () => void;
}

export default function CustomButton(props: React.PropsWithChildren<CustomButtonProps>) {
    return <button onClick={props.onClick} className="custom-button">
        {props.icon !== undefined && <Icon icon={props.icon}></Icon>}
        {props.children}
    </button>
}