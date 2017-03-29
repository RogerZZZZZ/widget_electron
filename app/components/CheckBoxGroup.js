import React from 'react'
import { Component } from 'react'


class CheckBoxGroup extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let self = this;
        return(
            <div className="checkBoxGroup">
                {self.props.children}
            </div>
        )
    }
}

export default CheckBoxGroup
