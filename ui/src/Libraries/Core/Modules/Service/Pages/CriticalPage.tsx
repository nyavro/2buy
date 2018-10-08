import * as React from 'react';
import {translate} from 'react-i18next';
import {IMixedProps} from 'Libraries/Core/Models';
import {EOperationError} from 'Libraries/Core/Enums';
import {RouteComponentProps} from 'react-router';
import {MdError} from 'react-icons/md';
import {Button} from 'reactstrap';
require('../assets/styles/Critical.styl');
require('../assets/nls/ru/Critical.json');

export interface IOrderRouteProps {
    operationError: EOperationError;
    backTo: string;
}

type TProps = IMixedProps & RouteComponentProps<IOrderRouteProps>;

export const CriticalComponent = (props: TProps) => {
    const {i18n, match: {params: {operationError}}} = props;
    return <div className="critical-page">
        <div className="message">
            <MdError className="svg"/>
            <div>{i18n.t(`Critical:${operationError}`)}</div>
            {operationError !== EOperationError.accessDenied && <div>
                <div>{i18n.t('Critical:tryLater')}</div>
                <Button onClick={props.history.goBack}>{i18n.t('Critical:repeat')}</Button>
            </div>}
        </div>
    </div>;
};
export const CriticalPage = translate('Critical')(CriticalComponent);