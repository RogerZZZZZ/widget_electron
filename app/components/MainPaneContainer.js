import React from 'react'
import { Component } from 'react'


class MainPaneContainer extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <div className="main-pane-container">
                {this.props.children}
            </div>
        )
    }
}

export default MainPaneContainer
