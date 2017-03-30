import React from 'react';
import { Component } from 'react'
import { Input, TodolistPane } from './TodolistComponenet.js'



class Todolist extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="todolist-pane">
                <Input/>
                <TodolistPane/>
            </div>
        )
    }
}


export default Todolist;
