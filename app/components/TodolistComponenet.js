import React from 'react'
import { Component } from 'react'
import Button from "./Button.js"
import DatePicker from "react-datepicker"
import moment from 'moment'
import testData from './textData.js'
import Utils from '../utils/utils.js'
import 'react-datepicker/dist/react-datepicker.css';

let utils = new Utils();

class Input extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="input-container">
                <input type="text" placeholder={this.props.placeholder} className={this.props.styleClass} onFocus={this.props.onFocus} onBlur={this.props.onBlur} onKeyUp={this.props.onKeyUp}/>
            </div>
        )
    }
}

class TodolistItem extends Component{
    constructor(props){
        super(props)

        this.state = {
            data: this.props.data,
            editStatus: false,
            isOpen: false
        }

    }

    __changeInputStatus(){
        this.setState({
            editStatus: !this.state.editStatus
        });
    }

    __inputSubmit(event){
        if(event.keyCode == "13"){
            event.target.blur();
            this.__saveTitle()
        }else if(event.keyCode == '27'){
            this.__changeInputStatus();
        }
    }

    __renderTitle(data){
        return(
            <div className={"content-container"}>{data.title}</div>
        )
    }

    __saveTitle(){
        this.__changeInputStatus();
    }


    __renderTitleInput(data){
        return(
            <input  autoComplete="off" autoFocus defaultValue={data.title} maxLength="64" ref="inputBox" className="inputBox" onKeyUp={this.__inputSubmit.bind(this)}  type="text"/>
        )
    }


    __handleStartTime(date) {
        if(utils.judgeValidTime(date, this.state.data.end)){
            this.state.data.start = date;
            this.setState({
                data: this.state.data
            })
        }else{
            alert("Invalid time period! please input again!")
        }

    	this.__toggleCalendar()
    }

    __handleEndTime(date){
        if(utils.judgeValidTime(this.state.data.start, date)){
            this.state.data.end = date;
            this.setState({
                data: this.state.data
            })
        }else{
            alert("Invalid time period! please input again!")
        }
    	this.__toggleCalendar()
    }

    __toggleCalendar(e) {
    	e && e.preventDefault()
    	this.setState({
    		isOpen: !this.state.isOpen
    	})
    }

    render(){
        let self = this;
        let data = this.state.data;
        return(
            <div className="todolist-item">
                <div className="todolist-item-main">
                    {
                        self.state.editStatus ? null: (
                            <Button name="check" buttonClick={()=>console.log("click")} className="left-button" align="left"/>
                        )
                    }
                    {self.state.editStatus ? this.__renderTitleInput(data) : this.__renderTitle(data)}
                    {
                        self.state.editStatus ? null: (
                            <Button name="edit" buttonClick={self.__changeInputStatus.bind(this)} align="right" />
                        )
                    }
                    <Button name="trash" buttonClick={()=>console.log("obj")} align="right"/>
                </div>
                {
                    !self.state.editStatus ? null: (
                        <div className="todolist-item-additional">
                            <div className="todolist-data-select-pane">
                                <div className="select-pane-content">Start Time:</div>
                                <div className="select-pane-date">
                                    <DatePicker customInput={<DatePickerComponent />} selected={moment(data.start)} onChange={this.__handleStartTime.bind(self)} />
                                </div>
                            </div>
                            <div className="todolist-data-select-pane">
                                <div className="select-pane-content">End Time:</div>
                                <div className="select-pane-date">
                                    <DatePicker customInput={<DatePickerComponent />} selected={moment(data.end)} onChange={this.__handleEndTime.bind(self)} />
                                </div>
                            </div>
                            <div className="todolist-data-select-pane">
                                <div className="select-pane-content">Duration:</div>
                                <div className="select-pane-content">{utils.timeCalculator(data.start, data.end, 'day')} days</div>
                            </div>
                        </div>
                    )
                }
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

class DatePickerComponent extends Component{
	render() {
		return (
			<button className={this.props.type === 'big'? "date-picker-big-input" :"date-picker-input"} onClick={this.props.onClick}>
				{this.props.value}
			</button>
		)
	}
}


module.exports = {
    Input: Input,
    TodolistItem: TodolistItem,
    TodolistPane: TodolistPane,
    DatePickerComponent: DatePickerComponent
}
