module.exports = `'use strict';

let SlackCore = require('sourcebot').Slack;
let SlackBot = new SlackCore({
    token: process.env.TOKEN,
    debug: process.env.DEBUG
});

SlackBot
  .connect()
  .then((bot) => {
    bot
      .listen('hello', (response) => {
        bot.send({
          channel: response.channel,
          text: 'world'
        });
      })
  })
  .catch((err) => console.error(err.message));`;
