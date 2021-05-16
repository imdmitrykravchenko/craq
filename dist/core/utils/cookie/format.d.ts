import { CookieSetServicePayload } from '../../services/cookie/types';
declare const format: ({ name, value, path, expires, }: CookieSetServicePayload) => string;
export default format;
