var yaml = require('js-yaml');
var fs = require('fs');

var mongo_env;
try {
    const buffer = yaml.load(fs.readFileSync('env.yaml', 'utf8'));
    api_env = buffer.api;
    mongo_env = buffer.mongo;
    jwt_env = buffer.jwt;
  } catch (e) {
    console.log(e);
  }

  var url_buffer = "mongodb://";
  mongo_env.url = url_buffer.concat(mongo_env.ip,":",mongo_env.port,"/",mongo_env.db);


module.exports = {
api_env,
mongo_env,
jwt_env
};