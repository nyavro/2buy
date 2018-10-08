"use strict";
exports.__esModule = true;
var Enums_1 = require("../../Libraries/Core/Enums");
exports.ROUTES = {
    ROOT: '/',
    CLIENT: {
        MAIN: '/client',
        CREATE: '/client/edit',
        EDIT: '/client/edit/:id'
    },
    AUTH: {
        LOGIN: '/login',
        LOGOUT: '/logout'
    },
    SERVICE: {
        ERROR: '/error/:operationError',
        UNAUTHORIZED: "/error/" + Enums_1.EOperationError.unauthorized
    },
    ORDER_REQUEST: {
        PATH: '/order_request/',
        CREATE: '/order_request/create/:carId',
        DETAILS: '/order_request/:id',
        LIST: '/order_request/list'
    },
    ORDER: {
        PATH: '/order/',
        DETAILS: '/order/:orderId/',
        LIST: '/order/list'
    },
    CAR: {
        PATH: '/car/',
        EDIT: '/car/edit/:carId',
        LIST: '/car/list'
    }
};
