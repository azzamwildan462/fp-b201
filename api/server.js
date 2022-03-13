const mongoose = require('mongoose');
const http = require('http');
const { url } = require('inspector');
const { header } = require('./utils/header');
const {
    api_env,
    mongo_env
} = require('./utils/yaml-parser');

const { 
    createNewUser,
    userLogin,
    deleteUser
} = require('./controllers/userControllers');

const { 
    getUserInfo,
    updateData,
    findNearby,
    findByLevel,
    findByInstruments,
    findByInstrumentsBinary,
    findWithManyParams
} = require('./controllers/userDataController');

/*
Selama ini logika pencarian masih menggunakan logika OR
Rencana kedepan ada dua yaitu dengan logika OR 
dan juga dengan logika AND
*/

mongoose.connect(mongo_env.url,(err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

const server = http.createServer((req,res)=>{
    req.url = encodeURI(req.url);

    //Ketika koneksi (req,res) user sangat lambat, melebihi 12345 ms
    res.setTimeout(12345,()=>{
        res.writeHead(408,header);
        res.end(JSON.stringify({message: 'HTTP Error 408 - Request Timeout'}));
    })


    //URL HANDLERR!! 

    //user/user69
    if(req.url.match(/\/user\/([a-zA-Z0-9])+$/) && req.method == 'GET'){
        const uname = req.url.split('/')[2];
        getUserInfo(req,res,uname);
    }
    //user/user123/findNearby/10
    else if(req.url.match(/\/user\/([a-zA-Z0-9])+\/findNearby\/([0-9])+$/) && req.method == 'GET'){
        const uname = req.url.split('/')[2];
        const treshold = parseInt(req.url.split('/')[4]);

        findNearby(req,res,uname,treshold);
    }
    //user/minLevel/69/maxLevel/169
    else if(req.url.match(/\/user\/minLevel\/([0-9])+\/maxLevel\/([0-9])+$/) && req.method == 'GET'){
        const min_level = parseInt(req.url.split('/')[3]);
        const max_level = parseInt(req.url.split('/')[5]);

        findByLevel(req,res,min_level,max_level);
    }
    //user/findByInstruments/100010010
    else if(req.url.match(/\/user\/findByInstruments\/([0-1])+$/) && req.method == 'GET'){
        const instruments = req.url.split('/')[3];

        findByInstrumentsBinary(req,res,instruments);
    }
    //user/findByInstruments/gitar-bass-drum
    else if(req.url.match(/\/user\/findByInstruments\/([a-zA-Z-])+$/) && req.method == 'GET'){
        const instruments = req.url.split('/')[3];

        findByInstruments(req,res,instruments);
    }
    //user/user69/findNearby/10/findByInstruments/111010010/minLevel/12/maxLevel/123
    else if(req.url.match(/\/user\/([a-zA-Z0-9])+\/findNearby\/([0-9])+\/findByInstruments\/([0-1])+\/minLevel\/([0-9])+\/maxLevel\/([0-9])+$/) && req.method == 'GET'){
        const uname = req.url.split('/')[2];
        const treshold = parseInt(req.url.split('/')[4]);
        const instruments_binary = req.url.split('/')[6];
        const min_level = parseInt(req.url.split('/')[8]);
        const max_level = parseInt(req.url.split('/')[10]);

        findWithManyParams(req,res,uname,treshold,instruments_binary,min_level,max_level);

        // console.log(`success: ${uname} && ${treshold} && ${instruments_binary} && ${min_level} && ${max_level}`);
    }
    //user/register
    else if(req.url == '/user/register' && req.method == 'POST'){
        createNewUser(req,res);
    }
    //user/login
    else if(req.url == '/user/login' && req.method == 'POST'){
        userLogin(req,res);
    }
    //user/user72/delete
    else if(req.url.match(/\/user\/([a-zA-Z0-9])+\/delete/) && req.method == 'DELETE'){
        const uname = req.url.split('/')[2];
        deleteUser(req,res,uname);
    }
    //user/user123/update
    else if(req.url.match(/\/user\/([a-zA-Z0-9])+\/update/) && req.method == 'PUT'){
        const uname = req.url.split('/')[2];
        updateData(req,res,uname)
    }
    else if(req.url == "/favicon.ico" && req.method == 'GET'){
        res.writeHead(404,header);
        res.end(JSON.stringify({message: 'There is no favicon.ico, you should follow the damn train!'}));
    }
    //Invalid URLLLLLLL
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid URL' }));
    }
})

server.listen(api_env.port,(e)=>{
    if(e){
        console.log(e);
    }
    else {
        console.log(`Server running on port ${api_env.port}`);
    }
})


