import http from 'http'
import cheerio from 'cheerio'

let basketballUrl = {
	gameResult: 'http://www.espn.com/nba/schedule',
	teamRanking: 'http://www.espn.com/nba/standings',
	playerStatistics: 'http://www.espn.com/nba/statistics'
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
	BasketballCrawler: BasketballCrawler
}
