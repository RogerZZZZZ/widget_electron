import React from 'react'
import { Component } from 'react'

class Button extends Component{
    constructor(props){
        super(props);
        this.state = {
            picName: "../assets/" + this.props.name + ".png",
            originName: this.props.name
        }
    }

    __hoverInListener(){
        this.setState({
            picName : "../assets/" + this.state.originName + "-on.png"
        })
    }

    __hoverOutListener(){
        this.setState({
            picName: "../assets/" + this.state.originName + ".png"
        })
    }


    render(){
        return (
            <div className={this.props.align == "left"? "left-button circle-button": "right-button circle-button"} onMouseOver={this.__hoverInListener.bind(this)} onClick={this.props.buttonClick} onMouseLeave={this.__hoverOutListener.bind(this)}>
                <img src={this.state.picName} className="circle-button-img" ref="buttonImg"/>
            </div>
        )
    }
}


export default Button
