import React from 'react'
import { Component} from 'react'
import { BasketballCrawler} from '../utils/crawler.js'
import { Table, ButtonGroup, Button } from './BasketballComponent.js'

let bCrawler = new BasketballCrawler();

class Basketball extends Component{
    constructor(props){
        super(props)
        let self = this;
        bCrawler.init('gameResult', (data) => {
            self.setState({gameResult: data})
        });
        bCrawler.init('teamRanking', (data) => {
            self.setState({teamRanking: data})
        });
        bCrawler.init('playerStatistics', (data) => {
            self.setState({playerStatistics: data})
        });
        this.state = {
            gameResult: [],
            teamRanking: [],
            playerStatistics: [],
            pageIndex: 0 //0:Schedule, 1:Ranking, 2: Player Statistics
        }
    }

    __naviButtonClick(val){
        this.setState({
            pageIndex: val
        })
    }


    render(){
        let self = this;
        let pageIndex = this.state.pageIndex;
        let gameResult = this.state.gameResult;
        let todayMatch = (gameResult.length === 0 ? []: gameResult.today),
            tomorrowMatch = (gameResult.length === 0 ? []: gameResult.tomorrow);
        let teamRanking = this.state.teamRanking;
        let eastRanking = (teamRanking.length === 0 ? []: teamRanking.east),
            westRanking = (teamRanking.length === 0 ? []: teamRanking.west);
        let ps = this.state.playerStatistics;
        let pts = [], blk = [], stl =[], fg = [], reb = [], ass = [];
        if(ps.length !== 0){
            pts = ps.pts;
            blk = ps.blk;
            stl = ps.stl;
            fg = ps.fg;
            reb = ps.reb;
            ass = ps.ass;
        }
        return (
            <div>
                <ButtonGroup>
                    <Button name="Schedule" onClick={self.__naviButtonClick.bind(self, 0)} status={pageIndex===0?false: true}/>
                    <Button name="Ranking" onClick={self.__naviButtonClick.bind(self, 1)} status={pageIndex===1?false: true}/>
                    <Button name="Statistics" onClick={self.__naviButtonClick.bind(self, 2)} status={pageIndex===2?false: true}/>
                </ButtonGroup>
                {
                    pageIndex === 0? (
                        <div className="main-wrap">
                            <div className="title">Schedule</div>
                            <Table data={todayMatch} type={0} />
                            <Table data={tomorrowMatch} type={1} />
                        </div>
                    ):
                    (pageIndex === 1? (
                        <div className="main-wrap">
                            <div className="title">NBA Standings</div>
                            <Table data={eastRanking} type={2} />
                            <Table data={westRanking} type={2} />
                            <div className="glossary">
                                <div className="title">GLOSSARY</div>
                                <div className="item">
                                    <span className="lite">W:</span>
                                    <span>Wins</span>
                                </div>
                                <div className="item">
                                    <span className="lite">L:</span>
                                    <span>Losses</span>
                                </div>
                                <div className="item">
                                    <span className="lite">PCT:</span>
                                    <span>Winning Percentage</span>
                                </div>
                                <div className="item">
                                    <span className="lite">GB:</span>
                                    <span>Games Back</span>
                                </div>
                                <div className="item">
                                    <span className="lite">HOME:</span>
                                    <span>Home Record</span>
                                </div>
                                <div className="item">
                                    <span className="lite">ROAD:</span>
                                    <span>Road Record</span>
                                </div>
                                <div className="item">
                                    <span className="lite">PPG:</span>
                                    <span>Points Per Game</span>
                                </div>
                                <div className="item">
                                    <span className="lite">OPP PPG:</span>
                                    <span>Opponent Points Per Game</span>
                                </div>
                                <div className="item">
                                    <span className="lite">L10:</span>
                                    <span>Record last 10 games</span>
                                </div>
                                <div className="item">
                                    <span className="lite">STRK:</span>
                                    <span>Current Streak</span>
                                </div>
                                <div className="item">
                                    <span className="lite">X:</span>
                                    <span>Clinched Playoff berth</span>
                                </div>
                                <div className="item">
                                    <span className="lite">Y:</span>
                                    <span>Clinched Dicision</span>
                                </div>
                                <div className="item">
                                    <span className="lite">E:</span>
                                    <span>Eliminated From Playoff</span>
                                </div>
                            </div>
                        </div>
                    ):
                    (
                        <div className="main-wrap">
                            <div className="title">Player Statistics</div>
                            <div className="statistics-container">
                                <Table data={pts} type={3} header="POINTS"/>
                                <Table data={blk} type={3} header="BLOCKS"/>
                                <Table data={ass} type={3} header="ASSISTS"/>
                            </div>
                            <div className="statistics-container">
                                <Table data={reb} type={3} header="REBOUNDS"/>
                                <Table data={stl} type={3} header="STEALS"/>
                                <Table data={fg} type={3} header="FIELD GOAL %"/>
                            </div>
                        </div>
                    ))
                }

            </div>
        )
    }
}
export default Basketball
