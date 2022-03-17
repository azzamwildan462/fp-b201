var yaml = require('js-yaml');
var fs = require('fs');

var mongo_env;
var api_env;
var jwt_env;
var status_code;
try {
    const buffer = yaml.load(fs.readFileSync('env.yaml', 'utf8'));
    api_env = buffer.api;
    mongo_env = buffer.mongo;
    jwt_env = buffer.jwt;

    status_code = yaml.load(fs.readFileSync('./utils/httpStatusCode.yaml','utf8'));

  } catch (e) {
    console.log(e);
  }

  var url_buffer = "mongodb://";
  mongo_env.url = url_buffer.concat(mongo_env.ip,":",mongo_env.port,"/",mongo_env.db);

  // console.log(status_code.BAD_REQUEST);
module.exports = {
api_env,
mongo_env,
jwt_env,
status_code
};