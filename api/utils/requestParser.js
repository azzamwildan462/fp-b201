const { parse } = require('querystring');

const getHeader = (req, headerName) => new Promise((resolve, reject) => {
    try {
        const header = req.headers[`${headerName}`];
        resolve(header);
    } catch (e) {
        reject(e);
    }
});

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
getBodyData,
getHeader
};