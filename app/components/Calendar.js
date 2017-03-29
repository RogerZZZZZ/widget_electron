import React from 'react'
import {Component} from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment'
import cn from 'classnames'
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);


class Calendar extends Component {
	render() {
        let event = []
		return (<BigCalendar {...this.props} events={event} defaultDate={new Date()} className="main_window_container"/>)
	}
}

export default Calendar;
