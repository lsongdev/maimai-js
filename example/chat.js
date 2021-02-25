const maimai = require('..');

const session = {
  u: '32120843',
  access_token: '1.d993765eb97f9cda9ac84be6adbf0b4a'
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