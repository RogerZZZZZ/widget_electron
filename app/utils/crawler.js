var http = require('http');
// var cheerio = require('cheerio')
// import superagent from 'superagent'
// var superagent = require('superagent')
import cheerio from 'cheerio'

let basketballUrl = {
	gameResult: 'http://watch.nba.com/'
}

class BasketballCrawler {
	init(target) {
		let self = this;
		let html = '';
		// http.get(basketballUrl[target], function(res) {
		//     res.on('data', function(data) {
		//         html += data;
		//     });
		//
		//     res.on('end', function() {
		//         if(target === 'gameResult'){
		//             self.gameResultCallback(html)
		//         }
		//     })
		// })
		// superagent.get(basketballUrl[target]).end(function(err, sres) {
		// 	// 常规的错误处理
		// 	if (err) {
		// 		return next(err);
		// 	}
		// 	// sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
		// 	// 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
		// 	// 剩下就都是 jquery 的内容了
		// 	// var $ = cheerio.load(sres.text);
		// 	// var items = [];
		// 	// $('#topic_list .topic_title').each(function(idx, element) {
		// 	// 	var $element = $(element);
		// 	// 	items.push({title: $element.attr('title'), href: $element.attr('href')});
		// 	// });
        //     self.gameResultCallback(sres.text)
		// });
	}

	gameResultCallback(html) {
		let $ = cheerio.load(html);
		console.log(html);
		// let item = $('.stream').find('.list-time');
		let item = $('.game-container')
		let len = item.length;
		console.log(item);
		console.log(len);

	}
}

module.exports = {
	BasketballCrawler: BasketballCrawler
}
