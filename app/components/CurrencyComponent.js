import React from 'react'
import { Component } from 'react'
let assetsPrefix = process.env.DEV? '..': '.'

class ComboBox extends Component{
    constructor(props){
        super(props)

        this.state =  {
            selectedItem: this.props.selectItems[this.props.default],
            selectItems: this.props.selectItems,
            isShow: false,
            selectedIndex: this.props.default
        }
    }

    _toggleShowStatus(){
        this.setState({
            isShow: !this.state.isShow
        })
    }

    _selectItem(index, name){
        this.setState({
            isShow: false,
            selectedItem: name,
            selectedIndex: index-1
        })
        this.props.onHandleSelect(this.props.type, index-1);
    }

    render(){
        let self = this;
        let count = 0;
        return (
            <div className="combobox-container">
                <div className="show-container" onClick={self._toggleShowStatus.bind(self)}>{self.props.selectItems[self.props.default]}</div>
                {
                    self.state.isShow? (
                        <div className="select-container">
                            {
                                self.state.selectItems.map((item) => {
                                    return (
                                        <div className="select-item" key={count++} onClick={self._selectItem.bind(self, count, item)}>{item}</div>
                                    )
                                })
                            }
                        </div>
                    ):null
                }
            </div>
        )
    }
}


class Button extends Component{
    constructor(props){
        super(props)
        this.state = {
            picName: assetsPrefix + '/assets/'+ this.props.picSrc + '.png'
        }
    }

    render(){
        return (
            <div className="button-wrap" onClick={this.props.click}>
                <img src={this.state.picName} className="button-img"/>
            </div>
        )
    }
}



module.exports = {
    ComboBox: ComboBox,
    Button: Button
}
