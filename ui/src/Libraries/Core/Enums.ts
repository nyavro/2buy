export enum ELoadingStatus {
    IDLE,
    LOADING,
    SUCCESS,
    FAILURE
}

export enum EDayPeriod {
    MORNING = 'MORNING',
    MIDDAY = 'MIDDAY',
    EVENING = 'EVENING'
}

export enum EOperationError {
    unknown = 'unknown',
    timeout = 'timeout',
    internalError = 'internalError',
    unauthorized = 'unauthorized',
    accessDenied = 'accessDenied'
}