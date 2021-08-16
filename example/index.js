const maimai = require('..');

const session = {
  u: '32120843',
  access_token: '1.6c99d4b6077db7bdd3a90894ac4854b4'
};

const chat = new maimai.Chat(session);
const enterprise = new maimai.Enterprise(session);

chat.on('message', (who, message) => {
  cconsole.log('You have a new message from:', who, message);
});

(async () => {

  const { data: contacts } = await chat.pbd1();
  for (const contact of contacts) {
    console.log(contact.name, `(${contact.company})`);
  }

  const { dialogues } = await chat.get_dlg('21983888');
  for (const dialog of dialogues) {
    console.log('-', dialog.text);
  }

  const res2 = await chat.add_dlg('21983888', "hello");
  console.log(res2);
})();


(async () => {
  const jid = 4739543;
  const { contacts } = await enterprise.recommend(jid, { page: 1 });
  for (const contact of contacts) {
    console.log(contact.id, contact.name);
    const res = await chat.recruiter_send(contact.id, `请问您对我发布的 "前端研发工程师" 职位感兴趣吗？`, { jid });
    console.log(res);
  }
})();
