var yaml = require('js-yaml');
var fs = require('fs');

var mongo_env;
try {
    const buffer = yaml.load(fs.readFileSync('env.yaml', 'utf8'));
    api_env = buffer.api;
    mongo_env = buffer.mongo;
  } catch (e) {
    console.log(e);
  }

module.exports = {
api_env,
mongo_env
};