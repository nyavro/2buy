import {IHeaders, IRestService} from "./IRestService";
import {EOperationError} from "../Enums";

const TIMEOUT = 9000;

export class RestService implements IRestService {

    get = (url:string, headers: IHeaders = {}): Promise<any> => {
        const config = {headers: headers};
        return this.withTimeout(this.wrapInPromise(url, config), TIMEOUT);
    };

    post = (url:string, body: any, headers: IHeaders = {}): Promise<any> => {
        const config = {
            method: 'POST',
            headers: {...headers, 'Content-Type':'application/json', 'Accept':'application/json'},
            body: JSON.stringify(body)
        };
        return this.withTimeout(this.wrapInPromise(url, config), TIMEOUT);
    };

    put = (url:string, body: any, headers: IHeaders = {}): Promise<any> => {
        const config = {
            method: 'PUT',
            headers: {...headers, 'Content-Type':'application/json', 'Accept':'application/json'},
            body: JSON.stringify(body)
        };
        return this.withTimeout(this.wrapInPromise(url, config), TIMEOUT);
    };

    private wrapInPromise = (url: string, config: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            fetch(url, config)
                .then(
                    (res) => {
                        if(res.ok) {
                            resolve(res.json());
                        }
                        else {
                            reject(res);
                        }
                    },
                    reject
                );
        });
    };

    private withTimeout = <T>(promise: Promise<T>, timeout: number): Promise<T> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => reject(this.timeoutError()), timeout);
            promise.then(
                resolve,
                (error) => reject(this.getError(error))
            );
        });
    };

    private timeoutError = () => ({operationError: EOperationError.timeout});

    private getError = (response: Response) => {
        let operationError = EOperationError.internalError;
        switch (response.status) {
            case 401:
                operationError = EOperationError.unauthorized;
                break;
            case 403:
                operationError = EOperationError.accessDenied;
                break;
            case 500:
            case 502:
                operationError = EOperationError.internalError;
                break;
            case 504:
                operationError = EOperationError.timeout;
                break;
        }
        return {operationError: operationError}
    };
}
