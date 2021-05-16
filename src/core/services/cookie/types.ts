
export type CookieSetServicePayload = {
  path?: string;
  expires?: number; // days
  name: string;
  value: string | number;
};
