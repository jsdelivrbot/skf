var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/api/test', function (req, res) {
    res.json({ result: 'OK' }); 
});

app.get('/api/getfriends', function (req, res) {
    request('http://skype.postjung.com/msnload.ajax.php?p=gen', function (err, response, body) {
        if (!err && response.statusCode === 200) {
            let $ = cheerio.load(body);
            let xw = $('.xw');
            let friends = [];
            xw.each((x, ele) => {
                let hasCam = $(ele).find('.x1 > img').length;
                let email = $(ele).find('.x1').text().trim();
                let msg = $(ele).find('.x3').text().trim();
                let age = $(ele).find('.x4').text().trim();
                let province = $(ele).find('.x6').text().trim();
                if (msg.indexOf('เกย์') === -1 && msg.indexOf('ครับ') === -1 && msg.indexOf('เทย') === -1 && msg.indexOf('สอง') === -1 && msg.indexOf('ไม่ใช่หญิงแท้') === -1)
                    friends.push({ hasCam: hasCam, email: email, msg: msg, age: age, province: province });
            });
            res.json(friends);
        } else {
            res.send(err);
        }
    });
});

app.get('/api/getfriends2', function (req, res) {
    request('http://xn--42ci3ct8dn7a4bv8dwb5ce.com/modules/member/list_friend.php?fl=skype&g=2&dummy=' + new Date().getTime(), (err, response, body) => {
        if (!err && response.statusCode === 200) {
            let $ = cheerio.load(body);
            let xw = $('.box');
            let friends = [];
            xw.each((x, ele) => {
                let hasCam = 0;
                let email = $(ele).find('.boxsmall').text().trim();
                let msg = $(ele).find(':nth-child(5)').text().trim().replace(/"/g, '');
                let age = $(ele).find(':nth-child(3)').text().trim().replace(/[^0-9]+/g, '');
                let province = $(ele).find(':nth-child(4)').text().trim();

                if (msg.indexOf('เกย์') === -1 && msg.indexOf('ครับ') === -1 && msg.indexOf('เทย') === -1 && msg.indexOf('สอง') === -1 && msg.indexOf('ไม่ใช่หญิงแท้') === -1)
                    friends.push({ hasCam: hasCam, email: email, msg: msg, age: age, province: province });
            });
            res.json(friends);
        } else {
            res.send(err);
        }
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});