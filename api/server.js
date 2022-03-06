const mongoose = require('mongoose');
const http = require('http');
const { url } = require('inspector');

// Connect to DB
mongoose.connect('mongodb://localhost:6969/test_db',(err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

const server = http.createServer((req,res)=>{
    req.url = encodeURI(req.url);

    console.log(`${req.method}: ${req.url}`); //Debug

    //Ketika koneksi (req,res) user sangat lambat, melebihi 12345 ms
    res.setTimeout(12345,()=>{
        res.writeHead(408,{'Content-type': 'Application/json'});
        res.end(JSON.stringify({message: 'HTTP Error 408 - Request Timeout'}));
    })


    //URL HANDLERR!! 

    console.log(`${req.url}`);
    //user/user69
    if(req.url.match(/\/user\/([a-zA-Z0-9])+$/) && req.method == 'GET'){
        const id = req.url.split('/')[2];

        //apakah id tersedia di database??
        //jika iya, maka ambil datanya
        //jika tidak, maka kirim pesan error

        console.log(`success: ${id}`);
    }
    //user/user69/findNearby/10
    else if(req.url.match(/\/user\/([a-zA-Z0-9])+\/findNearby\/([0-9])+$/) && req.method == 'GET'){
        const id = req.url.split('/')[2];
        const total_req = parseInt(req.url.split('/')[4]);

        //apakah id tersedia di database dan apakah total_req kurang dari total user??
        //jika iya, maka ambil data-datanya
        //jika tidak, maka kirim pesan error

        console.log(`success: ${id} && ${total_req}`);
    }
    //user/minLevel/69/maxLevel/169
    else if(req.url.match(/\/user\/minLevel\/([0-9])+\/maxLevel\/([0-9])+$/) && req.method == 'GET'){
        const min_level = parseInt(req.url.split('/')[3]);
        const max_level = parseInt(req.url.split('/')[5]);

        //apakah min_level < max_level && min_level < 255 && max_level > 0??
        //jika iya, maka ambil data-datanya
        //jika tidak, maka kirim pesan error1

        console.log(`success: ${min_level} && ${max_level}`);
    }
    //user/findByInstruments/100010010
    else if(req.url.match(/\/user\/findByInstruments\/([0-1])+$/) && req.method == 'GET'){
        const instruments = parseInt(req.url.split('/')[3]);

        //apakah array instruments sesuai dengan max_instruments di DB??
        //jika iya, maka ambil data-datanya
        //jika tidak, maka kirim pesan error

        console.log(`success: ${instruments}`);
    }
    //user/user69/findNearby/10/findByInstruments/111010010/minLevel/12/maxLevel/123
    else if(req.url.match(/\/user\/([a-zA-Z0-9])+\/findNearby\/([0-9])+\/findByInstruments\/([0-1])+\/minLevel\/([0-9])+\/maxLevel\/([0-9])+$/) && req.method == 'GET'){
        const id = req.url.split('/')[3];
        const total_req = parseInt(req.url.split('/')[4]);
        const instruments = parseInt(req.url.split('/')[6]);
        const min_level = parseInt(req.url.split('/')[8]);
        const max_level = parseInt(req.url.split('/')[10]);

        /*
        apakah id tersedia di database dan 
        apakah total_req kurang dari total user dan 
        array instruments sesuai dengan max_instruments di DB dan 
        min_level < max_level && min_level < 255 && max_level > 0 ??
        jika iya, maka ambil data-datanya
        jika tidak, maka kirim pesan error
        */

       console.log(`success: ${id} && ${total_req} && ${instruments} && ${min_level} && ${max_level}`);
    }
    //user/register
    else if(req.url == '/user/register' && req.method == 'POST'){

        //Tambah user, tanpa validasi, validasnya nanti di controller

        console.log(`success register`);
    }
    //user/user72/delete
    else if(req.url.match(/\/user\/([a-zA-Z0-9])+\/delete/) && req.method == 'DELETE'){
        const id = req.url.split('/')[2];

        //Delete by username

        console.log(`success delete: ${id}`);

    }
    //user/user123/update
    else if(req.url.match(/\/user\/([a-zA-Z0-9])+\/update/) && req.method == 'PUT'){
        const id = req.url.split('/')[2];

        //Update all entity by username

        console.log(`success update: ${id}`);

    }
    //Invalid URLLLLLLL
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'URL Invalid' }));
    }
})

const PORT = 4321;

server.listen(PORT,(e)=>{
    if(e){
        console.log(e);
    }
    else {
        console.log(`server running on port ${4321}`);
    }
})


