import { CraqService } from '../../../types';
import format from '../../../core/utils/cookie/format';
import { SetCookieServicePayload } from '../../../core/services/cookie/types';

const setCookieService: CraqService<SetCookieServicePayload> = (
  context,
  payload,
) => {
  document.cookie = format(payload);

  return Promise.resolve();
};

export default setCookieService;
