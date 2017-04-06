import http from 'http'
import cheerio from 'cheerio'
import Utils from './utils.js'

let utils = new Utils();

let basketballUrl = {
	gameResult: 'http://www.espn.com/nba/schedule',
	teamRanking: 'http://www.espn.com/nba/standings',
	playerStatistics: 'http://www.espn.com/nba/statistics'
}

let currencyUrl = 'http://www.currencydo.com/'

class CurrencyCrawler{
	init(callback){
		let self = this;
		let html = '';
	    http.get(currencyUrl, function(res) {
	        res.on('data', function(data) {
	            html += data;
	        });

	        res.on('end', function() {
				callback(self.currencyCallback(html));
	        })
	    })
	}

	currencyCallback(html){
		let $ = cheerio.load(html);
		let wrap = $(".table tr");
		let currency = [];
		currency.push(1)
		wrap.each((item) => {
			if(item === 2 || (item >= 4 && item <= 9) || (item >= 12 && item <= 19) || (item >= 21 && item <= 23) || item === 26){
				let tmpTd = $(wrap[item]).find('td')[1];
				let tmpC = parseFloat($(tmpTd).text())/100;
				currency.push(utils.floatFormat(tmpC, 3))
			}
		})
		return currency;
	}
}

class BasketballCrawler {
	init(target, callback) {
		let self = this;
		let html = '';
	    http.get(basketballUrl[target], function(res) {
	        res.on('data', function(data) {
	            html += data;
	        });

	        res.on('end', function() {
				if(target === 'gameResult'){
					callback(self.gameResultCallback(html));
				}else if(target === 'teamRanking'){
					callback(self.teamRankingCallback(html));
				}else if(target === 'playerStatistics'){
					callback(self.playerStatisticsCallback(html));
				}
	        })
	    })
	}

	splitString(str){
		let tmp = str.split('.')[1].split(',');
		return {name: tmp[0], team: tmp[1]}
	}

	teamRankingCallback(html){
		let $ = cheerio.load(html);
		let wrap = $('.responsive-table-wrap .standings');
		let eastRanking = [], westRanking = [];
		wrap.each((item) => {
			let tr = $(wrap[item]).find('tr');
			tr.each((trItem) => {
				let td = $(tr[trItem]).find('td');
				let singleTeam = {};
				td.each((tdItem) => {
					let tmpTd = $(td[tdItem]);
					if(tdItem === 0){
						let number = tmpTd.find('.number').text();
						let teamName = tmpTd.find('.team-names').text();
						let playOffStatus = tmpTd.find('.key').text();
						singleTeam.number = number;
						singleTeam.name = teamName;
						singleTeam.playOffStatus = playOffStatus;
					}else if(tdItem === 1){
						singleTeam.win = tmpTd.text();
					}else if(tdItem === 2){
						singleTeam.lose = tmpTd.text();
					}else if(tdItem === 3){
						singleTeam.pct = tmpTd.text();
					}else if(tdItem === 4){
						singleTeam.gb = tmpTd.text();
					}else if(tdItem === 5){
						singleTeam.home = tmpTd.text();
					}else if(tdItem === 6){
						singleTeam.road = tmpTd.text();
					}else if(tdItem === 9){
						singleTeam.ppg = tmpTd.text();
					}else if(tdItem === 10){
						singleTeam.oppg = tmpTd.text();
					}else if(tdItem === 12){
						singleTeam.strk = tmpTd.text();
					}else if(tdItem === 13){
						singleTeam.lten = tmpTd.text();
					}
				})
				if(item === 0){
					eastRanking.push(singleTeam)
				}else{
					westRanking.push(singleTeam)
				}
			})
		})
		return {east:eastRanking, west:westRanking}
	}

	playerStatisticsCallback(html){
		let self = this;
		let $ = cheerio.load(html);
		let wrap = $('.mod-content .tablehead');
		let pts = [], reb = [], ass = [], blk = [], fg = [], stl = [];
		wrap.each((item) => {
			if(item < 6){
				let tr = $(wrap[item]).find('tr');
				tr.each((trItem) => {
					let player = {};
					let tmpTd = $(tr[trItem]).find('td');
					let content, value;
					if(trItem >= 2 && trItem < 6){
						content = self.splitString($(tmpTd[0]).text());
						value = $(tmpTd[1]).text();
					}else if(trItem === 1){
						content = self.splitString($(tmpTd[1]).text());
						value = $(tmpTd[2]).text();
					}

					if(trItem >=1 && trItem < 6){
						player.name = content.name;
						player.team = content.team;
						player.value = value;
						if(item === 0){
							pts.push(player);
						}else if(item === 1){
							ass.push(player);
						}else if(item === 2){
							fg.push(player);
						}else if(item === 3){
							reb.push(player);
						}else if(item === 4){
							blk.push(player);
						}else if(item === 5){
							stl.push(player);
						}
					}
				})
			}
		})
		return {pts:pts, reb:reb, ass:ass, blk:blk, fg:fg, stl:stl};
	}

	gameResultCallback(html) {
		let $ = cheerio.load(html);
		let wrap = $('.responsive-table-wrap tbody');
		let todayMatchesArr = [], tomorrowMatchesArr = [];
		wrap.each(function(item){
			if(item < 2){
				let tr = $(wrap[item]).find('tr');
				tr.each(function(trItem){
					let td = $(tr[trItem]).find('td');
					let todayMatch = {}, tomorrowMatch = {};
					td.each(function(tdItem){
						let tmpTd = $(td[tdItem]);
						if(item === 0){
							if(tdItem === 0){
								let guestTeam = tmpTd.find('.team-name span').text();
								let guestTeamLogo = tmpTd.find('.schedule-team-logo').attr('src');
								todayMatch.guestTeam = guestTeam;
								todayMatch.guestTeamLogo = guestTeamLogo;
							}else if(tdItem === 1){
								let homeTeam = tmpTd.find('.team-name span').text();
								let homeTeamLogo = tmpTd.find('.schedule-team-logo').attr('src');
								todayMatch.homeTeam = homeTeam;
								todayMatch.homeTeamLogo = homeTeamLogo;
							}else if(tdItem === 2){
								let result = tmpTd.find('a').text();
								todayMatch.result = result;
							}else if(tdItem === 3){
								let winnerHighest = tmpTd.text();
								todayMatch.winnerHighest = winnerHighest;
							}else{
								let loserHighest = tmpTd.text();
								todayMatch.loserHighest = loserHighest;
							}
						}else{
							if(tdItem === 0){
								let guestTeam = tmpTd.find('.team-name span').text();
								let guestTeamLogo = tmpTd.find('.schedule-team-logo').attr('src');
								tomorrowMatch.guestTeam = guestTeam;
								tomorrowMatch.guestTeamLogo = guestTeamLogo;
							}else if(tdItem === 1){
								let homeTeam = tmpTd.find('.team-name span').text();
								let homeTeamLogo = tmpTd.find('.schedule-team-logo').attr('src');
								tomorrowMatch.homeTeam = homeTeam;
								tomorrowMatch.homeTeamLogo = homeTeamLogo;
							}
						}
					})
					if(item === 0){
						todayMatchesArr.push(todayMatch)
					}else{
						tomorrowMatchesArr.push(tomorrowMatch)
					}
				})
			}
		})

		if($('.responsive-table-wrap').length > 7){
			let finishWrap = $('.responsive-table-wrap')[1];
			let finishTr = $(finishWrap).find('tr');
			finishTr.each((item) => {
				if(item > 0){
					let finishTd = $(finishTr[item]).find('td');
					let finishMatch = {};
					finishTd.each((tdItem) => {
						let tmpTd = $(finishTd[tdItem]);
						if(tdItem === 0){
							let guestTeam = tmpTd.find('.team-name span').text();
							let guestTeamLogo = tmpTd.find('.schedule-team-logo').attr('src');
							finishMatch.guestTeam = guestTeam;
							finishMatch.guestTeamLogo = guestTeamLogo;
						}else if(tdItem === 1){
							let homeTeam = tmpTd.find('.team-name span').text();
							let homeTeamLogo = tmpTd.find('.schedule-team-logo').attr('src');
							finishMatch.homeTeam = homeTeam;
							finishMatch.homeTeamLogo = homeTeamLogo;
						}else if(tdItem === 2){
							let result = tmpTd.find('a').text();
							finishMatch.result = result;
						}else if(tdItem === 3){
							let winnerHighest = tmpTd.text();
							finishMatch.winnerHighest = winnerHighest;
						}else{
							let loserHighest = tmpTd.text();
							finishMatch.loserHighest = loserHighest;
						}
					})
					todayMatchesArr.push(finishMatch)
				}
			})
		}

		return {today:todayMatchesArr, tomorrow:tomorrowMatchesArr};
	}
}

module.exports = {
	BasketballCrawler: BasketballCrawler,
	CurrencyCrawler: CurrencyCrawler
}
