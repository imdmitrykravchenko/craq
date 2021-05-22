import { CraqService } from '../../../types';
import parse from '../../../core/utils/cookie/parse';

export type GetCookieServicePayload = {
  name: string;
  defaultValue?: string | number;
};

const getCookieService: CraqService<GetCookieServicePayload> = (
  context,
  { name, defaultValue = null },
) => {
  const value = parse(document.cookie, name);

  return Promise.resolve(value === null ? defaultValue : value);
};

export default getCookieService;
