/**
 * Created by a2014 on 14-6-19.
 */
//    精简server
var http = require('http');
var fs = require('fs');

var mime = {
    js: 'application/x-javascript',
    css: 'text/css',
    html: 'text/html',
    png: 'image/png',
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    bmp: 'image/bmp',
    jpg: 'image/jpg'
}
http.createServer(function (req, res) {

    var url = req.url;

    var arr = [];
    var len = 0;
    req.on('data', function (postDataChunk) {
        len += postDataChunk.length;
        arr.push(postDataChunk);

    })

    req.on('end', function () {
        console.log(arr);
        if (Buffer.isBuffer(arr[0])) {
            fs.writeFile('aa.jpeg', arr[0]);

        }
    })
//    console.log(url);
    if (url == '/') {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

        fs.readFile('a.html', 'utf8', function (err, data) {
            res.write(data);
            res.end();
        });

    } else if (url.indexOf('png') != -1) {
        fs.readFile('a.png', 'binary', function (err, data) {
            res.writeHead(200, {'Content-Type': mime.png});
            res.write(data, 'binary');
            res.end();
        });
    }

}).listen(8000, null);