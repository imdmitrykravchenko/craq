import { CraqService } from '../../../types';
import format from '../../../core/utils/cookie/format';
import { CookieSetServicePayload } from '../../../core/services/cookie/types';
import ServerContext from '../../ServerContext';

const cookieSetService: CraqService<CookieSetServicePayload> = (
  context: ServerContext<any>,
  payload,
) => {
  context.ctx.set('Set-Cookie', format(payload));

  return Promise.resolve();
};

export default cookieSetService;
