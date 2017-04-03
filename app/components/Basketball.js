import React from 'react'
import { Component} from 'react'
import {BasketballCrawler} from '../utils/crawler.js'

let bCrawler = new BasketballCrawler();

class Basketball extends Component{
    constructor(props){
        super(props)
        bCrawler.init('gameResult');

    }


    render(){
        return (
            <div></div>
        )
    }
}
export default Basketball
