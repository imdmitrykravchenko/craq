import { CraqService } from '../../../types';
import format from '../../../core/utils/cookie/format';
import { SetCookieServicePayload } from '../../../core/services/cookie/types';
import ServerContext from '../../ServerContext';

const setCookieService: CraqService<SetCookieServicePayload> = (
  context: ServerContext<any>,
  payload,
) => {
  context.ctx.set('Set-Cookie', format(payload));

  return Promise.resolve();
};

export default setCookieService;
