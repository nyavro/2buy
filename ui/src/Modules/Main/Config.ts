import {reduce} from 'lodash';
import * as i18n from 'i18next';
import * as xhr  from 'i18next-xhr-backend';
import {reactI18nextModule} from 'react-i18next';
import {namespaces as login} from 'Libraries/Core/Modules/Login';
import {namespaces as core} from 'Libraries/Core';
import {IClientAppContext} from './Models';

i18n
    .use(xhr)
    .use(reactI18nextModule)
    .init({
        fallbackLng: 'ru',
        ns: reduce([login(), core()], (res, item) => res.concat(item), []),
        backend: {loadPath: 'nls/{{lng}}/{{ns}}.json'},
        debug: true,
        interpolation: {
            escapeValue: false
        },
        react: {
            wait: true
        }
    });

export default i18n;

const base = 'http://localhost:3000/rest1';

export const ClientContext: (errorsRoute: string) => IClientAppContext = (errorsRoute: string) => {
    const clientMicroservice = {
        backend: base,
        errorsRoute: errorsRoute
    };
    const loginMicroservice = {
        backend: base,
        errorsRoute: errorsRoute
    };
    return {
        login: loginMicroservice,
        dictionary: clientMicroservice,
        orderRequest: clientMicroservice,
        client: clientMicroservice,
        messaging: clientMicroservice,
        car: clientMicroservice,
        order: clientMicroservice,
        group: clientMicroservice
    }
};