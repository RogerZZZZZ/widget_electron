import React from 'react';
import { Component } from 'react'
import { Input, TodolistPane, DatePickerComponent } from './TodolistComponenet.js'
import Storage from 'electron-json-storage';
import Utils from '../utils/utils.js'
import moment from 'moment'
import DatePicker from "react-datepicker"

import 'react-datepicker/dist/react-datepicker.css';

let utils = new Utils();

class Todolist extends Component{
    constructor(props){
        super(props)
        let todolist;
        let self = this;
        // Storage.remove('todolist')
        Storage.has('todolist', function(err, hasKey) {
            if(err) throw err;

            if(!hasKey) {
                Storage.set('todolist', [], self.setTodolist([]));
                todolist = [];
                console.log("obj1");
            }else{
                Storage.get('todolist', function(err, data){
                    if(err) throw err;
                    todolist = data;
                    self.setTodolist(data);
                })
            }
        })

        this.state = {
            isOpen: true,
            todolist: todolist,
            startTime: moment(),
            endTime: moment().add(1, "days")
        }
    }

    setTodolist(val){
        this.setState({todolist: val})
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
        // this.setState({
        //     isOpen: false
        // })
    }

    __submitItem(event){
        if(event.keyCode == "13"){
            event.target.blur();
            this.__saveItem(event.target.value);
            event.target.value = "";
        }else if(event.keyCode == "27"){
            this.setState({
                isOpen: false
            })
        }
    }

    __saveItem(title){
        let self = this;
        let todolist = this.state.todolist;
        if(title !== '' && title !== undefined){
            let id = todolist.length >= 1 ? todolist[todolist.length - 1].id + 1: 0;
            let saveItem = {
                id: id,
                title: title,
                start: this.state.startTime,
                end: this.state.endTime,
                status: 'wait'
            }
            todolist[todolist.length] = saveItem;
            Storage.set('todolist', todolist, () => {
                self.setTodolist(todolist);
            })
        }
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
                <TodolistPane todolist={self.state.todolist ? self.state.todolist : []}/>
            </div>
        )
    }
}


export default Todolist;
