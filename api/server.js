const http = require('http');
const { url } = require('inspector');

const server = http.createServer((req,res)=>{
    req.url = encodeURI(req.url);

    console.log(`${req.method}: ${req.url}`); //Debug

    //Ketika koneksi user sangat lambat, melebihi 12345 ms
    res.setTimeout(12345,()=>{
        res.writeHead(408,{'Content-type': 'Application/json'});
        res.end(JSON.stringify({message: 'HTTP Error 408 - Request Timeout'}));
    })


    //URL HANDLERR!! 

    console.log(`${req.url}`);
    //muzix/user/user69
    if(req.url.match(/\/muzix\/user\/([a-zA-Z0-9])/g) && req.method == 'GET'){
        const id = req.url.split('/')[3];
        //apakah id tersedia di database??
        //jika iya, maka ambil datanya
        //jika tidak, maka kirim pesan error

        console.log(`success: ${id}`);
    }
    //muzix/user/user69/findNearby/10
    else if(req.url.match(/\/muzix\/user\/([a-zA-Z0-9])\/findNearby\/([0-9])/g) && req.method == 'GET'){
        const id = req.url.split('/')[3];
        const total_req = parseInt(req.url.split('/')[5]);
        //apakah id tersedia di database dan apakah total_req kurang dari total user??
        //jika iya, maka ambil data-datanya
        //jika tidak, maka kirim pesan error
        console.log(`success: ${id} && ${total_req}`);
    }
    //muzix/user/minLevel/69/maxLevel/169
    else if(req.url.match(/\/muzix\/user\/minLevel\/([0-9])\/maxLevel\/([0-9])/g) && req.method == 'GET'){
        const min_level = parseInt(req.url.split('/')[4]);
        const max_level = parseInt(req.url.split('/')[6]);
        //apakah min_level < max_level && min_level < 255 && max_level > 0??
        //jika iya, maka ambil data-datanya
        //jika tidak, maka kirim pesan error1
        console.log(`success: ${min_level} && ${max_level}`);
    }
    //muzix/user/findByInstruments/100010010
    else if(req.url.match(/\/muzix\/user\/findByInstruments\/([0-1])/g) && req.method == 'GET'){
        const instruments = parseInt(req.url.split('/')[4]);
        //apakah array instruments sesuai dengan max_instruments di DB??
        //jika iya, maka ambil data-datanya
        //jika tidak, maka kirim pesan error
        console.log(`success: ${instruments}`);
    }
    //muzix/user/user69/findNearby/10/findByInstruments/111010010minLevel/12/maxLevel/123
    else if(req.url.match(/\/muzix\/user\/([a-zA-Z0-9])\/findNearby\/([0-9])\/findByInstruments\/([0-1])\/minLevel\/([0-9])\/maxLevel\/([0-9])/g) && req.method == 'GET'){
        const id = req.url.split('/')[3];
        const total_req = parseInt(req.url.split('/')[5]);
        const instruments = parseInt(req.url.split('/')[7]);
        const min_level = parseInt(req.url.split('/')[9]);
        const max_level = parseInt(req.url.split('/')[11]);

        console.log(`success: ${id} && ${total_req} && ${instruments} && ${min_level} && ${max_level}`);

        /*
        apakah id tersedia di database dan 
        apakah total_req kurang dari total user dan 
        array instruments sesuai dengan max_instruments di DB dan 
        min_level < max_level && min_level < 255 && max_level > 0 ??
            jika iya, maka ambil data-datanya
            jika tidak, maka kirim pesan error
        */
    }
    //muzix/user/register
    else if(req.url == '/muzix/user/register' && req.method == 'POST'){
        //Tambah user, tanpa validasi, validasnya nanti di controller
        
        console.log(`success register`);
    }
    //muzix/user/user72/delete
    else if(req.url.match(/\/muzix\/user\/([a-zA-Z0-9])\/delete/g) && req.method == 'DELETE'){
        //Delete by username
        console.log(`success delete: ${id}`);

    }
    //muzix/user/user123/update
    else if(req.url.match(/\/muzix\/user\/([a-zA-Z0-9])\/update/g) && req.method == 'PUT'){
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


