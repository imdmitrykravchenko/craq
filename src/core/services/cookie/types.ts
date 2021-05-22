
export type SetCookieServicePayload = {
  path?: string;
  expires?: number; // days
  name: string;
  value: string | number;
};
