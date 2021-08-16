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
  sendv2(uid, content) {
    const { u } = this;
    const greet_text = encodeURIComponent(content);
    const query = `channel=www&comfirmed=1&fr=recommend_pc_v0.1&greet_text=${greet_text}&is_has_name=1&jid&template_id&u=${u}&u2=${uid}&version=5.0.2`;
    return this.get(`/groundhog/job/v3/direct/recruiter/send?${query}`);
  }
}


module.exports = MaimaiEnterprise;