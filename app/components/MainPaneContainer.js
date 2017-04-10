import React from 'react'
import { Component } from 'react'


class MainPaneContainer extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div className={this.props.bgc ? "main-pane-container main-pane-brown": "main-pane-container main-pane-white"}>
                {this.props.children}
            </div>
        )
    }
}

export default MainPaneContainer
