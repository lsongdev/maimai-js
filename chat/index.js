const { stringify } = require('querystring');
const { get, post, readStream, buildForm } = require('tiny-network');

const chat = ({
  u,
  csrf = Math.random(),
  access_token,
  channel = 'web_im',
  version = '5.0.2',
  domain = 'https://maimai.cn',
} = {}) => {
  const baseQuery = stringify({ u, channel, version });
  const format = res => readStream(res).then(JSON.parse);
  const headers = {
    'x-csrf-token': csrf,
    'cookie': `access_token=${access_token}; u=${u}; csrftoken=${csrf};`,
  };
  const _get = (path, query) => {
    headers['content-type'] = 'application/json';
    const qs = stringify({ ...query });
    return get(`${domain}${path}?${baseQuery}&${qs}`, headers).then(format);
  };
  const _post = (path, body) => {
    const { boundary, payload } = buildForm(body);
    headers['content-type'] = `multipart/form-data; boundary=${boundary}`;
    return post(`${domain}${path}?${baseQuery}`, payload, headers).then(format);
  };
  const listeners = {};
  return {
    on: (type, fn) => {
      listeners[type] = listeners[type] || [];
      listeners[type].push(fn);
      return fn;
    },
    /**
     * 获取联系人列表
     * @param {*} param0 
     */
    pbd1({ paginate = 0 } = {}) {
      return _get(`/groundhog/contact/v4/pbd1`, { json: 1, paginate });
    },
    /**
     * 获取对话
     * @param {*} mid 
     * @param {*} param1 
     */
    get_dlg(mid, { before_did, count = 10 } = {}) {
      return _get(`/groundhog/msg/v5/get_dlg`, { mid, before_did, count });
    },
    /**
     * 发送消息
     */
    async add_dlg(mid, text) {
      const msghash = 'im' + ~Date.now() + Math.random();
      return _post(`/groundhog/msg/v5/add_dlg`, { mid, msghash, text });
    },
  };
};

module.exports = chat;