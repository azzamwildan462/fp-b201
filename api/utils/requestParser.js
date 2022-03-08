const { parse } = require('querystring');

const getBodyData = (req,callback) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        // callback(parse(body));
        callback(body);
    });
};

module.exports = {
getBodyData
};