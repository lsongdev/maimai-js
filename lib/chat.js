const MaimaiBase = require('./base');

class MaimaiChat extends MaimaiBase {
  /**
   * 获取联系人列表
   * @param {*} param0 
   */
  pbd1({ paginate = 0 } = {}) {
    return this.get(`/groundhog/contact/v4/pbd1`, { json: 1, paginate });
  }
  /**
   * 获取对话
   * @param {*} mid 
   * @param {*} param1 
   */
  get_dlg(mid, { before_did, count = 10 } = {}) {
    return this.get(`/groundhog/msg/v5/get_dlg`, { mid, before_did, count });
  }
  /**
   * 发送消息
   */
  add_dlg(mid, text) {
    const msghash = 'im' + ~Date.now() + Math.random();
    return this.post(`/groundhog/msg/v5/add_dlg`, { mid, msghash, text });
  }
  /**
   * 招聘立即沟通
   * @param {*} uid 
   * @param {*} content 
   * @returns 
   */
  recruiter_send(uid, content) {
    const { u } = this;
    const greet_text = encodeURIComponent(content);
    const query = `channel=www&comfirmed=1&fr=recommend_pc_v0.1&greet_text=${greet_text}&is_has_name=1&jid&template_id&u=${u}&u2=${uid}&version=5.0.2`;
    return this.get(`/groundhog/job/v3/direct/recruiter/send?${query}`);
  }
}

module.exports = MaimaiChat;