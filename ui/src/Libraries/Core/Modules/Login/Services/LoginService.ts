import {IAuth, ICredentials, ILoginContext, ILoginService} from '../Models';
import {IRestService} from 'Libraries/Core/Services/IRestService';
import {RestService} from 'Libraries/Core/Services/RestService';
import {EOperationError} from "../../../Enums";

export class LoginService implements ILoginService {

    private restService: IRestService;
    private readonly baseUrl: string;

    constructor (context: ILoginContext) {
        this.restService = new RestService();
        this.baseUrl = context.config.backend;
    }

    login = (credentials:ICredentials) => {
        return this.restService.post(
            `${this.baseUrl}/auth`,
            credentials
            ).then(
                response => response as IAuth,
                (response) => {
                    //TODO: Прокинуть код ошибки авторизации с бека.
                    //Пока понимаем internalError как неправильный логин/пароль
                    throw response.operationError === EOperationError.internalError ?
                        'badCredentials' :
                        'serviceUnavailable';
                }
            );
    }
}
