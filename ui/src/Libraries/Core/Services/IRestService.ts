export interface IRestService {
    get: (url:string, headers?: IHeaders) => Promise<any>;
    post: (url:string, body: any, headers?: IHeaders) => Promise<any>;
    put: (url:string, body: any, headers?: IHeaders) => Promise<any>;
}

export interface IHeaders {
    [key: string]: string;
}