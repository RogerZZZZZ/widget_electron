import React from 'react'
import { Component } from 'react'
import Constants from '../constants.js'
import { ComboBox, Button } from './CurrencyComponent.js'
import { CurrencyCrawler } from '../utils/crawler.js'
import Utils from '../utils/utils.js'

let cCrawler = new CurrencyCrawler();
let utils = new Utils();

class Currency extends Component{
    constructor(props){
        super(props);
        cCrawler.init((data) => {
            this.setState({
                currencyData: data
            })
        })
        this.state = {
            fromCurrency: 7,
            toCurrency: 0,
            result: null,
            currencyData: []
        }
    }

    handleSelectName(type, val){
        if(type === 0){
            this.setState({
                fromCurrency: val
            })
        }else{
            this.setState({
                toCurrency: val
            })
        }
    }

    _submitForm(){
        if(this.state.currencyData.length === 0){
            alert("Please wait for loading data. Try again later.")
        }else{
            let data = this.state.currencyData;
            let amount = this.refs.amount.value;
            let fromCurrency = data[this.state.fromCurrency];
            let toCurrency = data[this.state.toCurrency];
            let result = (fromCurrency/toCurrency)*amount;
            this.setState({
                result: utils.floatFormat(result, 3)
            })

        }
    }

    _swapUnit(){
        let tmp = this.state.fromCurrency;
        this.setState({
            fromCurrency: this.state.toCurrency,
            toCurrency: tmp
        })
    }

    render(){
        let self = this;
        console.log(this.state.fromCurrency, this.state.toCurrency);
        return (
            <div className="currency-window">
                <div className="currency-container">
                    <ComboBox selectItems={Constants.defaultCurrency} onHandleSelect={self.handleSelectName.bind(self)} type={0} default={self.state.fromCurrency}/>
                    <input className="transfer-input" placeholder="Input..." defaultValue={1} ref="amount"/>
                    <Button picSrc="transfer" click={self._swapUnit.bind(self)}/>
                    <ComboBox selectItems={Constants.defaultCurrency} onHandleSelect={self.handleSelectName.bind(self)} type={1} default={self.state.toCurrency}/>
                    <div onClick={self._submitForm.bind(self)} className="submit-button">click</div>
                </div>
                <div className="result-box">{self.state.result === null ? 'Click the button to calculate': "You can get " + self.state.result + Constants.defaultCurrency[self.state.toCurrency]}</div>
            </div>

        )
    }
}



export default Currency;
