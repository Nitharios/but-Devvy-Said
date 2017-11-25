const { Wit, log } = require('node-wit');
const { client, MIN_CONFIDENCE } = require('../../../node-wit/wit.js');

module.exports = (function() {

  return {
    receive : receive,
    hears : hears    
  };

  function receive(bot, message, next) {
    console.log('===== wit.receive HEARD MIDDLEWARE =====');
    console.log(message);

    // Wit will only recieve TEXT
    if (message.text && message.type !== 'self_message') {
      // sends the received message to Wit
      return client.message(message.text)
      .then(data => {
        console.log('===== RESPONSE FROM WIT.AI =====');

        message.entities = data.entities;
        message.info_type = message.entities.info_type;
        message.db_query = message.entities.db_query;
        message.greetings = message.entities.greetings;

        console.log(message); 

        next();

      })
      .catch(err => {
        console.log('wit error', err);
        message.error = true;
        next();

      });
    }
  }

  function hears(patterns, message) {
    console.log('===== wit.hears HEAR MIDDLEWARE =====');
    console.log(patterns);
    console.log(message);
    
    // patterns is the first argument of controller.hears
    if (patterns) return true;

    if (patterns && message.entities && message.entities.db_query) {
      return message.entities.db_query.some(query => {
        return patterns.some(pattern => {
          // check for a pattern that wants everything
          if (query.value === pattern && query.confidence >= MIN_CONFIDENCE) {
            return true;
          }
        });
      });
    }

    return false;
  }


})();
