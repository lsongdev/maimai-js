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
  async add_dlg(mid, text) {
    const msghash = 'im' + ~Date.now() + Math.random();
    return this.post(`/groundhog/msg/v5/add_dlg`, { mid, msghash, text });
  }
}

// alias
MaimaiChat.prototype.send = MaimaiChat.prototype.add_dlg;

module.exports = MaimaiChat;