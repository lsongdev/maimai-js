## maimai 脉脉

> 成就职业梦想

maimai javascript api

### how to install

```sh
~$ npm i maimai --save
```

### how to use
 
#### chat example 

```js
const maimai = require('maimai');

const chat = new maimai.Chat({
  u: '888888888', // user id
  access_token: '-- YOUR ACCESS TOKEN HERE --',
});

chat.on('message', (who, message) => {
  cconsole.log('You have a new message from:', who, message);
});

(async () => {

  // 获取好友列表
  const { data: contacts } = await chat.pbd1();
  for (const contact of contacts) {
    console.log(contact);
  }

  // 获取好友会话消息
  const { dialogues } = await chat.get_dlg('21983888');
  for (const dialog of dialogues) {
    console.log(dialog);
  }

  // 给好友发送消息
  const res2 = await chat.send('21983888', "hello");
  console.log(res2);
  
})();
```

#### enterprise example

```js
const maimai = require('maimai');

const session = {
  u: 'user id',
  access_token: 'access token'
};

const enterprise = new maimai.Enterprise(session);

(async () => {
  const jid = 3750925;
  // 根据发布的职位 ID 获取推荐的候选人
  const { contacts } = await enterprise.recommend(jid, { page: 1 });
  for (const contact of contacts) {
    console.log(contact.id, contact.name);
    // 极速联系候选人
    const res = await enterprise.send(contact.id, `请问您对我发布的 \"前端研发工程师\" 职位感兴趣吗？`, { jid });
    console.log(res);
  }
})();
```

### license

This project is under MIT license.
