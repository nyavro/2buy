"use strict";
exports.__esModule = true;
var ELoadingStatus;
(function (ELoadingStatus) {
    ELoadingStatus[ELoadingStatus["IDLE"] = 0] = "IDLE";
    ELoadingStatus[ELoadingStatus["LOADING"] = 1] = "LOADING";
    ELoadingStatus[ELoadingStatus["SUCCESS"] = 2] = "SUCCESS";
    ELoadingStatus[ELoadingStatus["FAILURE"] = 3] = "FAILURE";
})(ELoadingStatus = exports.ELoadingStatus || (exports.ELoadingStatus = {}));
var EDayPeriod;
(function (EDayPeriod) {
    EDayPeriod[EDayPeriod["MORNING"] = 'MORNING'] = "MORNING";
    EDayPeriod[EDayPeriod["MIDDAY"] = 'MIDDAY'] = "MIDDAY";
    EDayPeriod[EDayPeriod["EVENING"] = 'EVENING'] = "EVENING";
})(EDayPeriod = exports.EDayPeriod || (exports.EDayPeriod = {}));
var EOperationError;
(function (EOperationError) {
    EOperationError[EOperationError["unknown"] = 'unknown'] = "unknown";
    EOperationError[EOperationError["timeout"] = 'timeout'] = "timeout";
    EOperationError[EOperationError["internalError"] = 'internalError'] = "internalError";
    EOperationError[EOperationError["unauthorized"] = 'unauthorized'] = "unauthorized";
    EOperationError[EOperationError["accessDenied"] = 'accessDenied'] = "accessDenied";
})(EOperationError = exports.EOperationError || (exports.EOperationError = {}));
