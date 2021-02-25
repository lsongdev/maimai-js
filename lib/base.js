const EventEmitter = require('events');
const { stringify } = require('querystring');
const { get, post, readStream, buildForm } = require('tiny-network');

const format = res =>
  readStream(res).then(JSON.parse);

class MaimaiBase extends EventEmitter {
  constructor({ u, access_token }) {
    super();
    Object.assign(this, {
      u,
      access_token,
      channel: 'web_im',
      version: '5.0.2',
      csrf: Math.random(),
      domain: 'https://maimai.cn'
    });
  }
  get headers() {
    const { access_token, u, csrf } = this;
    return {
      'x-csrf-token': csrf,
      'cookie': `access_token=${access_token}; u=${u}; csrftoken=${csrf};`,
    };
  }
  get baseQuery() {
    const { u, channel, version } = this;
    return stringify({ u, channel, version });
  }
  get(path, query) {
    const { domain, headers, baseQuery } = this;
    headers['content-type'] = 'application/json';
    const qs = stringify({ ...query });
    return get(`${domain}${path}?${baseQuery}&${qs}`, headers).then(format);
  }
  post(path, body) {
    const { domain, headers, baseQuery } = this;
    const { boundary, payload } = buildForm(body);
    headers['content-type'] = `multipart/form-data; boundary=${boundary}`;
    return post(`${domain}${path}?${baseQuery}`, payload, headers).then(format);
  }
}

module.exports = MaimaiBase;