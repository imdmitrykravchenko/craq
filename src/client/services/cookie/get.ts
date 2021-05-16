import { CraqService } from '../../../types';
import parse from '../../../core/utils/cookie/parse';

export type CookieGetServicePayload = {
  name: string;
  defaultValue?: string | number;
};

const cookieGetService: CraqService<CookieGetServicePayload> = (
  context,
  { name, defaultValue = null },
) => {
  const value = parse(document.cookie, name);

  return Promise.resolve(value === null ? defaultValue : value);
};

export default cookieGetService;
