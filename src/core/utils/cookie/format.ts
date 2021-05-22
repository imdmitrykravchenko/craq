import { SetCookieServicePayload } from '../../services/cookie/types';

const getExpires = (days: number): string => {
  const date = new Date();

  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  return `expires=${date.toUTCString()}`;
};

const format = ({
  name,
  value,
  path = '/',
  expires,
}: SetCookieServicePayload): string =>
  [`${name}=${value}`, expires && getExpires(expires), `path=${path}`]
    .filter(Boolean)
    .join(';');

export default format;
