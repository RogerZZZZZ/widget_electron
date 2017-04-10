import React from 'react'
import { Component } from 'react'

let assetsPrefix = process.env.DEV? '..': '.'

class Button extends Component{
    constructor(props){
        super(props);
        let picName = (this.props.status === false || this.props.status === undefined? this.props.name: this.props.name+"-done");
        this.state = {
            picName: assetsPrefix + "/assets/" + picName+ ".png",
            originName: this.props.name
        }
    }

    _hoverInListener(){
        this.setState({
            picName : assetsPrefix + "/assets/" + this.state.originName + "-on.png"
        })
    }

    _hoverOutListener(){
        this.setState({
            picName: assetsPrefix + "/assets/" + this.state.originName + ".png"
        })
    }

    _buttonClick(){
        let picName;
        if(this.props.status){
            picName = this.props.name
        }else{
            picName = this.props.name + '-done';
        }
        this.setState({
            picName: assetsPrefix + "/assets/" + picName + ".png"
        })
        this.props.buttonClick();
    }


    render(){
        return (
            <div className={this.props.align == "left"? "left-button circle-button": "right-button circle-button"} onMouseOver={this.props.static?null:this._hoverInListener.bind(this)} onClick={this._buttonClick.bind(this)} onMouseLeave={this.props.static?null:this._hoverOutListener.bind(this)}>
                <img src={this.state.picName} className="circle-button-img" ref="buttonImg"/>
            </div>
        )
    }
}


export default Button
