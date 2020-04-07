const crypto = require('crypto');

module.exports = function genereteUiniqueId(){
  return crypto.randomBytes(4).toString('HEX');
}