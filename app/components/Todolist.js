import React from 'react';
import { Component } from 'react'
import { Input, TodolistPane, DatePickerComponent } from './TodolistComponenet.js'
import Utils from '../utils/utils.js'
import moment from 'moment'
import DatePicker from "react-datepicker"

import 'react-datepicker/dist/react-datepicker.css';

let utils = new Utils();

class Todolist extends Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen: true,
            startTime: moment(),
            endTime: moment().add(1, "days")
        }
    }

    __handleEndTime(date){
        if(utils.judgeValidTime(this.state.startTime, date)){
            this.setState({
                endTime: date
            })
        }else{
            alert("Invalid time period! please input again!")
        }
    }

    __handleStartTime(date){
        if(utils.judgeValidTime(date, this.state.endTime)){
            this.setState({
                startTime: date
            })
        }else{
            alert("Invalid time period! please input again!")
        }
    }

    __inputFocus(){
        this.setState({
            isOpen: true
        })
    }

    __inputBlur(){
        this.setState({
            isOpen: false
        })
    }

    __submitItem(event){
        if(event.keyCode == "13"){
            event.target.blur();
            this.__saveItem();
        }else if(event.keyCode == "27"){
            this.setState({
                isOpen: false
            })
        }
    }

    __saveItem(){

    }

    render(){
        let self = this;
        return (
            <div className="todolist-pane">
                <div className="new-todo-item-container">
                    <Input placeholder="What needs to be done?" styleClass="todolist-input" onFocus={this.__inputFocus.bind(this)} onBlur={this.__inputBlur.bind(this)} onKeyUp={this.__submitItem.bind(this)}/>
                    {
                        !this.state.isOpen? null: (
                            <div className="new-date-picker-container">
                                <div className="date-picker-item">
                                    <div className="date-picker-desc">Start Time</div>
                                    <DatePicker customInput={<DatePickerComponent type="big" />} minDate={moment()}      selected={self.state.startTime} onChange={this.__handleStartTime.bind(self)} />
                                </div>
                                <div className="date-picker-item">
                                    <div className="date-picker-desc">End Time</div>
                                    <DatePicker customInput={<DatePickerComponent type="big" />} minDate={moment()}        selected={self.state.endTime} onChange={this.__handleEndTime.bind(self)} />
                                </div>
                                <div className="date-picker-item">
                                    <div className="date-picker-desc">Expert Duration</div>
                                    <div className="date-picker-desc">{utils.timeCalculator(self.state.startTime, self.state.endTime, 'day')} days</div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <TodolistPane/>
            </div>
        )
    }
}


export default Todolist;
