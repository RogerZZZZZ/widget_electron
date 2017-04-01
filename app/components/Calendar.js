import React from 'react'
import {Component} from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment'
import Storage from 'electron-json-storage';
import cn from 'classnames'
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);


class Calendar extends Component {
    constructor(props){
        super(props)
        let event;
        let self = this;
        Storage.has('todolist', function(err, hasKey){
            if(err) throw err;

            if(!hasKey){
                event = [];
                self.setEvent(event);
            }else{
                Storage.get('todolist', function(err, data) {
                    if(err) throw err;

                    event = data;
                    self.setEvent(event);
                })
            }
        })

        this.state = {
            event : []
        }
    }


    setEvent(val){
        this.setState({event: val});
    }


	render() {
        let self = this;
		return (<BigCalendar {...this.props} events={self.state.event} defaultDate={new Date()} className="main_window_container"/>)
	}
}

export default Calendar;
