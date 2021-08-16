const maimai = require('..');

const session = {
  u: '32120843',
  access_token: '1.6c99d4b6077db7bdd3a90894ac4854b4'
};
const enterprise = new maimai.Enterprise(session);

(async () => {
  const jid = 4739543;
  const { contacts } = await enterprise.recommend(jid, { page: 1 });
  for (const contact of contacts) {
    console.log(contact.id, contact.name);
    const res = await enterprise.sendv2(contact.id, `请问您对我发布的 "前端研发工程师" 职位感兴趣吗？`, { jid });
    console.log(res);
  }
})();