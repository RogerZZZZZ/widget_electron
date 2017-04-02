import React from 'react'
import { Component } from 'react'

class Button extends Component{
    constructor(props){
        super(props);
        let picName = (this.props.status === false || this.props.status === undefined? this.props.name: this.props.name+"-done");
        this.state = {
            picName: "../assets/" + picName+ ".png",
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

    __buttonClick(){
        let picName;
        if(this.props.status){
            picName = this.props.name
        }else{
            picName = this.props.name + '-done';
        }
        this.setState({
            picName: "../assets/" + picName + ".png"
        })
        this.props.buttonClick();
    }


    render(){
        return (
            <div className={this.props.align == "left"? "left-button circle-button": "right-button circle-button"} onMouseOver={this.props.static?null:this.__hoverInListener.bind(this)} onClick={this.__buttonClick.bind(this)} onMouseLeave={this.props.static?null:this.__hoverOutListener.bind(this)}>
                <img src={this.state.picName} className="circle-button-img" ref="buttonImg"/>
            </div>
        )
    }
}


export default Button
