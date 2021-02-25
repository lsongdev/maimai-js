const maimai = require('..');

const session = {
  u: '32120843',
  access_token: '1.d993765eb97f9cda9ac84be6adbf0b4a'
};
const enterprise = new maimai.Enterprise(session);

(async () => {
  const jid = 3750925;
  const { contacts } = await enterprise.recommend(jid, { page: 1 });
  for (const contact of contacts) {
    console.log(contact.id, contact.name);
    const res = await enterprise.send(contact.id, `请问您对我发布的 \"前端研发工程师\" 职位感兴趣吗？`, { jid });
    console.log(res);
  }
})();