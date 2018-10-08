import {Dispatch} from 'redux';
import {push} from 'react-router-redux';
import {IAuthorizedRestServiceConstructor} from '../Services/AuthorizedRestService';
import {IBackendConfig, IError} from 'Libraries/Core/Models';
const pathToRegexp = require('path-to-regexp');
// import {generatePath} from 'react-router';
import {EOperationError} from 'Libraries/Core/Enums';

export interface IRedirectActions {
    redirect(pattern: string, params?: {[key:string]:any}): void;
}

export abstract class LoginRedirectActions<T, S> implements IRedirectActions {
    protected readonly service: T;

    constructor (private serviceConstructor: IAuthorizedRestServiceConstructor<T>, private backendConfig: IBackendConfig, protected dispatch: Dispatch<S>) {
        this.service = new serviceConstructor(
            backendConfig,
            {
                onError: (error:IError) => {
                    this.redirect(backendConfig.errorsRoute, {operationError: error.operationError})
                }
            }
        );
    }

    redirect = (pattern: string, params?: {[key:string]:any}) => {
        //TODO: вместо pathToRegexp перейти на метод generatePath 'react-router', когда он появится в npm (в исходниках на github-e уже есть)
        const path = params ? pathToRegexp.compile(pattern)(params) : pattern;
        // const path = generatePath(pattern, params);
        this.dispatch(push(path));
    }
}