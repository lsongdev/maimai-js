const maimai = require('..');

const session = {
  u: '32120843',
  access_token: '1.6c99d4b6077db7bdd3a90894ac4854b4'
};

const chat = new maimai.Chat(session);

chat.on('message', (who, message) => {
  cconsole.log('You have a new message from:', who, message);
});

(async () => {

  const { data: contacts } = await chat.pbd1();
  for (const contact of contacts) {
    console.log(contact);
  }

  const { dialogues } = await chat.get_dlg('21983888');
  for (const dialog of dialogues) {
    console.log(dialog);
  }

  const res2 = await chat.send('21983888', "hello");
  console.log(res2);
})();