export declare enum Method {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE"
}
export declare enum Credentials {
    Include = "include",
    Omit = "omit"
}
export declare enum Mode {
    Cors = "cors",
    NoCors = "no-cors"
}
export declare type HTTPRequestServicePayload = {
    pathname: string;
    method?: Method;
    query?: {
        [key: string]: string | number | string[] | number[];
    };
    body?: any;
    host?: string;
    protocol?: string;
    mode?: Mode;
    credentials?: Credentials;
    contentType?: string;
};
