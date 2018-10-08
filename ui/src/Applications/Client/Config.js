"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var i18n = require("i18next");
var xhr = require("i18next-xhr-backend");
var react_i18next_1 = require("react-i18next");
var Login_1 = require("Libraries/Core/Modules/Login");
var Core_1 = require("Libraries/Core");
i18n
    .use(xhr)
    .use(react_i18next_1.reactI18nextModule)
    .init({
    fallbackLng: 'ru',
    ns: lodash_1.reduce([Login_1.namespaces(), Core_1.namespaces()], function (res, item) { return res.concat(item); }, []),
    backend: { loadPath: 'nls/{{lng}}/{{ns}}.json' },
    debug: true,
    interpolation: {
        escapeValue: false
    },
    react: {
        wait: true
    }
});
exports["default"] = i18n;
var base = 'http://localhost:8087';
exports.ClientContext = function (errorsRoute) {
    var clientMicroservice = {
        backend: base,
        errorsRoute: errorsRoute
    };
    var loginMicroservice = {
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
    };
};
