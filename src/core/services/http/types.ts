export enum Method {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

export enum Credentials {
  Include = 'include',
  Omit = 'omit',
}

export enum Mode {
  Cors = 'cors',
  NoCors = 'no-cors',
}

export type HTTPRequestServicePayload = {
  pathname: string;
  method?: Method;
  query?: { [key: string]: string | number | string[] | number[] };
  headers?: { [key: string]: string };
  body?: any;
  host?: string;
  protocol?: string;
  mode?: Mode;
  credentials?: Credentials;
  contentType?: string;
};
