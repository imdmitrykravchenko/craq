import { CraqService } from '../../../types';
import parse from '../../../core/utils/cookie/parse';
import ServerContext from '../../ServerContext';

export type CookieGetServicePayload = {
  name: string;
  defaultValue?: string | number;
};

const cookieGetService: CraqService<CookieGetServicePayload> = (
  context: ServerContext<any>,
  { name, defaultValue = null },
) => {
  const value = parse(context.ctx.get('Cookie') || '', name);

  return Promise.resolve(value === null ? defaultValue : value);
};

export default cookieGetService;
