import React from 'react'
import { Component } from 'react'
import Button from "./Button.js"

import testData from './textData.js'


class Input extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="input-container">
                <input type="text" placeholder="What needs to be done?" className="todolist-input"/>
            </div>
        )
    }
}

class TodolistItem extends Component{
    constructor(props){
        super(props)

        this.state = {
            data: this.props.data,
            editStatus: false
        }

    }

    __changeInputStatus(){
        this.refs.inputBox.focus();
        this.setState({
            editStatus: !this.state.editStatus
        });
    }

    render(){
        let self = this;
        return(
            <div className="todolist-item">
                <Button name="check" buttonClick={()=>console.log("click")} className="left-button" align="left"/>
                <input type="text" defaultValue={self.state.data.title} ref="inputBox" className={this.state.editStatus?"box-show inputBox": "box-hide inputBox"}/>
                <div className={this.state.editStatus?"box-hide content-container":"box-show content-container"}>{self.state.data.title}</div>
                <Button name="edit" buttonClick={self.__changeInputStatus.bind(this)} align="right"/>
                <Button name="trash" buttonClick={()=>console.log("obj")} align="right"/>
            </div>
        )
    }
}


class TodolistPane extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: testData
        }
    }

    render(){
        let self = this;
        let keyCount = 0;
        return (
            <div>
                {
                    self.state.data.map(function(item){
                        return (<TodolistItem data={item} key={keyCount++}/>)
                    })
                }
            </div>
        )
    }
}


module.exports = {
    Input: Input,
    TodolistItem: TodolistItem,
    TodolistPane: TodolistPane
}
