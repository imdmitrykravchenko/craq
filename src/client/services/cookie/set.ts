import { CraqService } from '../../../types';
import format from '../../../core/utils/cookie/format';
import { CookieSetServicePayload } from '../../../core/services/cookie/types';

const cookieSetService: CraqService<CookieSetServicePayload> = (
  context,
  payload,
) => {
  document.cookie = format(payload);

  return Promise.resolve();
};

export default cookieSetService;
