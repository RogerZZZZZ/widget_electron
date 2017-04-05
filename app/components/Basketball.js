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
        // bCrawler.init('playerStatistics', (data) => {
        //     self.setState({playerStatistics: data})
        // });
        this.state = {
            gameResult: [],
            teamRanking: [],
            playerStatistics: [],
            pageIndex: 1 //0:Schedule, 1:Ranking, 2: Player Statistics
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
                            <div className="title">Ranking</div>
                            <Table data={eastRanking} type={2} />
                        </div>
                    ):
                    (
                        <div></div>
                    ))
                }

            </div>
        )
    }
}
export default Basketball
