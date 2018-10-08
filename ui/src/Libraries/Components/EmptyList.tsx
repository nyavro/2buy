import * as React from 'react';
import {Card} from 'reactstrap';

interface IProps {
    message: string;
}

export const EmptyList = ({message}: IProps) => <div>{message}</div>;