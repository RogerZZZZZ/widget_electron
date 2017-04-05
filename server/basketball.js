var https = require('https')
var http = require('http')
var cheerio = require('cheerio')
var superagent = require('superagent')

function gameResult(req, res, next){
    let html = '';
    http.get("http://www.espn.com/nba/schedule", function(res) {
        res.on('data', function(data) {
            html += data;
        });

        res.on('end', function() {
            var $ = cheerio.load(html)
            var items = $('.schedule-content').find('.schedule-game').find('.schedule-game__content')
            items.each(function(index, item){
                console.log(item);
            })
            // console.log(items.children().length + "--");
            // console.log(items.length);
        })
    })
}




module.exports = {
    gameResult: gameResult
}
