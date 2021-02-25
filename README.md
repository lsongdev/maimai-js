## maimai

maimai javascript api

### how to install

```sh
~$ npm i maimai --save
```

### example 

```js
const maimai = require('maimai');

const chat = maimai.chat({
  u: '888888888', // user id
  access_token: '-- YOUR ACCESS TOKEN HERE --',
});

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

  const res2 = await chat.add_dlg('21983888', "hello");
  console.log(res2);
})();
```

### license

This project is under MIT license.