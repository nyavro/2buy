import {IHeaders, IRestService} from "./IRestService";
import {RestService} from "./RestService";
import {IBackendConfig, IErrorsHandler} from 'Libraries/Core/Models';

export interface IAuthorizedRestServiceConstructor<T> {
    new(backendConfig: IBackendConfig, errorsHandler: IErrorsHandler): T;
}

export class AuthorizedRestService implements IRestService {

    restService: IRestService = new RestService();

    constructor (protected backendConfig: IBackendConfig, private errorsHandler: IErrorsHandler) {}

    private fetchData = (method: 'put'|'post') => (url:string, body: any = null, headers: IHeaders = {}) => (
        this.restService
            [method](url, body, {...headers, 'token': localStorage.getItem('token')})
            .then(
                (res) => res,
                this.errorsHandler.onError
            )
    );

    get = (url:string, headers: IHeaders = {}): Promise<any> => (
        this.restService
            .get(url, {...headers, 'token': localStorage.getItem('token')})
            .then(
                (res) => res,
                this.errorsHandler.onError
            )
    );

    post = this.fetchData('post');

    put = this.fetchData('put');
}
