import fetch from 'cross-fetch';
import qs from 'qs';
import url from 'url';
import { CraqService } from '../../../types';
import { Method, HTTPRequestServicePayload, Mode } from './types';

const handleResponse = (response) => {
  const contentType = response.headers.get('Content-Type');
  const done = (result) => (response.ok ? result : Promise.reject(result));

  if (!contentType) {
    return done(null);
  }

  if (contentType.includes('json')) {
    return response.json().then(done);
  }

  return response.text().then(done);
};

const httpRequestService: CraqService<HTTPRequestServicePayload> = (
  context,
  {
    protocol = 'https',
    contentType = 'application/json',
    method = Method.Get,
    mode = Mode.Cors,
    query = {},
    host,
    pathname,
    body,
    credentials,
  },
) => {
  const search = qs.stringify(query, { arrayFormat: 'brackets' });
  const fetchUrl = url.format({
    protocol,
    host,
    pathname,
    search: search ? `?${search}` : undefined,
  });

  return fetch(fetchUrl, {
    method,
    body,
    mode,
    credentials,
    headers: {
      'Content-Type': contentType,
    },
  }).then(handleResponse);
};

export default httpRequestService;
