const MaimaiBase = require('./base');

class MaimaiEnterprise extends MaimaiBase {
  /**
   * 获取推荐人才列表
   * @param {*} jid 
   * @param {*} param1 
   */
  recommend(jid, { page, filter_unmatch = 1 } = {}) {
    return this.get('/api/ent/discover/recommend', { jid, filter_unmatch, page });
  }
  /**
   * 极速联系候选人
   * @param {*} to_uids 
   * @param {*} content 
   * @param {*} param2 
   */
  send(to_uids, content, { jid, communication = 'direct_im' }) {
    return this.post('/api/ent/right/connect/direct/send', { to_uids, content, jid, communication });
  }
}


module.exports = MaimaiEnterprise;