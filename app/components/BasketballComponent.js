import React from 'react';
import { Component} from 'react'
import moment from 'moment'

class Table extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            type: this.props.type //0: today, 1: tomorrow, 2: ranking
        }
    }


    render(){
        let self = this;
        let count = 0;
        let today = moment();
        let date = this.state.type === 1 ? today.add(1, 'days').format('dddd, MMMM Do YYYY') : today.format('dddd, MMMM Do YYYY');
        let header = this.props.header ? this.props.header: '';
        return(
            <div className={self.props.type === 2? "table basketball-table-medium" : self.props.type === 3 ? "table basketball-table-small" :"table basketball-table-big"}>
                {
                    self.props.type !== 2 && self.props.type !== 3? (
                        <div className="date-container">{date}</div>
                    ):null
                }
                {
                    self.props.type === 3? (
                        <div className="date-container">{header}</div>
                    ):null
                }
                <TableHeader type={self.props.type} />
                {
                    self.props.data.map((item) => {
                        return (
                            <TableCell item={item} type={self.props.type} key={count++} index={count}/>
                        )
                    })
                }
            </div>
        )
    }
}

class TableHeader extends Component{
    constructor(props){
        super(props)
        this.state = {
            type : this.props.type
        }
    }

    render(){
        let self = this;
        return (
            <div>
                {
                    self.props.type === 0? (
                        <div className="table-head table-item-container">
                            <div className="cell-item big-cell">MATCHUP</div>
                            <div className="cell-item medium-cell">RESULT</div>
                            <div className="cell-item medium-cell">WINNER HIGH</div>
                            <div className="cell-item medium-cell">LOSER HIGH</div>
                        </div>
                    )
                    :self.props.type === 1? (
                        <div className="table-head table-item-container">
                            <div className="cell-item big-cell">MATCHUP</div>
                        </div>
                    )
                    :self.props.type === 2? (
                        <div className="table-head table-item-container">
                            <div className="cell-item big-cell">MATCHUP</div>
                            <div className="cell-item small-cell">W</div>
                            <div className="cell-item small-cell">L</div>
                            <div className="cell-item small-cell">PCT</div>
                            <div className="cell-item small-cell">GB</div>
                            <div className="cell-item small-cell">HOME</div>
                            <div className="cell-item small-cell">ROAD</div>
                            <div className="cell-item small-cell">PPG</div>
                            <div className="cell-item small-cell">OPP PPG</div>
                            <div className="cell-item small-cell">STRK</div>
                            <div className="cell-item small-cell">L10</div>
                        </div>
                    )
                    :(
                        <div className="table-head table-item-container">
                            <div className="cell-item small-cell">Rank</div>
                            <div className="cell-item big-cell">Player Name</div>
                            <div className="cell-item small-cell">Value</div>
                        </div>
                    )
                }
            </div>
        )
    }
}

class TableCell extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.item
        }
    }


    render(){
        let self = this;
        let itemData = self.props.item;
        return (
            <div>
            {
                self.props.type === 0 ? (
                    <div className="table-cell table-item-container">
                        <div className="cell-item big-cell ">
                            <div className="cell">
                                <div className="team-logo">
                                    <img src={itemData.guestTeamLogo} className="logo-img"/>
                                </div>
                                <span className="name">{itemData.guestTeam}</span>
                            </div>
                            <div className="cell home-cell">
                                <div className="team-logo">
                                    <img src={itemData.homeTeamLogo} className="logo-img"/>
                                </div>
                                <span className="name">{itemData.homeTeam}</span>
                            </div>
                        </div>
                        <div className="cell-item medium-cell">
                            <span>{itemData.result}</span>
                        </div>
                        <div className="cell-item medium-cell">
                            <span>{itemData.winnerHighest}</span>
                        </div>
                        <div className="cell-item medium-cell">
                            <span>{itemData.loserHighest}</span>
                        </div>
                    </div>
                )
                :self.props.type === 1 ? (
                    <div className="table-cell table-item-container">
                        <div className="cell-item big-cell ">
                            <div className="cell">
                                <div className="team-logo">
                                    <img src={itemData.guestTeamLogo} className="logo-img"/>
                                </div>
                                <span className="name">{itemData.guestTeam}</span>
                            </div>
                            <div className="cell home-cell">
                                <div className="team-logo">
                                    <img src={itemData.homeTeamLogo} className="logo-img"/>
                                </div>
                                <span className="name">{itemData.homeTeam}</span>
                            </div>
                        </div>
                    </div>
                )
                : self.props.type === 2 ? (
                    <div className={self.props.index !== 9? "table-cell table-item-container": "table-cell table-item-container playoff-line"}>
                        <div className="cell-item big-cell ">
                            <div className="cell">
                                <span className="number">{itemData.number}</span>
                                <span className="status">{itemData.playOffStatus}</span>
                                <span className="name">{itemData.name}</span>
                            </div>
                        </div>
                        <div className="cell-item small-cell ">
                            <span>{itemData.win}</span>
                        </div>
                        <div className="cell-item small-cell ">
                            <span>{itemData.lose}</span>
                        </div>
                        <div className="cell-item small-cell ">
                            <span>{itemData.pct}</span>
                        </div>
                        <div className="cell-item small-cell ">
                            <span>{itemData.gb}</span>
                        </div>
                        <div className="cell-item small-cell ">
                            <span>{itemData.home}</span>
                        </div>
                        <div className="cell-item small-cell ">
                            <span>{itemData.road}</span>
                        </div>
                        <div className="cell-item small-cell ">
                            <span>{itemData.ppg}</span>
                        </div>
                        <div className="cell-item small-cell ">
                            <span>{itemData.oppg}</span>
                        </div>
                        <div className="cell-item small-cell ">
                            <span>{itemData.strk}</span>
                        </div>
                        <div className="cell-item small-cell ">
                            <span>{itemData.lten}</span>
                        </div>
                    </div>
                )
                :(
                    <div className="table-cell table-item-container">
                        <div className="cell-item small-cell ">
                            <span>{self.props.index}</span>
                        </div>
                        <div className="cell-item big-cell ">
                            <span className="name">{itemData.name}, </span>
                            <span>{itemData.team}</span>
                        </div>
                        <div className="cell-item small-cell ">
                            <span>{itemData.value}</span>
                        </div>
                    </div>
                )
            }
            </div>
        )
    }
}

class ButtonGroup extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="button-group">
                {this.props.children}
            </div>
        )
    }
}


class Button extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name
        }
    }

    render(){
        let self = this;
        let status = this.props.status ? 'button-able': 'button-unable';
        return (
            <div className={status + " button"} onClick={this.props.onClick}>{self.state.name}</div>
        )
    }
}

module.exports = {
    Table: Table,
    ButtonGroup: ButtonGroup,
    Button: Button
}
