import { CraqService } from '../../../types';
export declare type CookieGetServicePayload = {
    name: string;
    defaultValue?: string | number;
};
declare const cookieGetService: CraqService<CookieGetServicePayload>;
export default cookieGetService;
