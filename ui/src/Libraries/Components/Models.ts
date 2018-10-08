import {IconType} from 'react-icons/lib/iconBase';

export interface IMenuItem {
    Icon: IconType;
    i18nKey: string;
    link: string;
}

export interface IOption {
    name: string;
    id: string;
}