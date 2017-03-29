import React, {Component} from "react";
import ReactDom from "react-dom";
import Storage from 'electron-json-storage';
import {Window, Content, PaneGroup, Pane} from "react-photonkit";
import nw from './backend/nw.interface.js'
import Calendar from './components/Calendar.js'
import constants from './constants.js'
import Utils from './utils/utils.js'

import Header from "./header.jsx"
import Footer from "./footer.jsx";
import Sidebar from "./sidebar.jsx"

require('../index.scss');

var utils = new Utils();

class MainWindow extends Component {
	constructor(props) {
		super(props);
		let settingItem;
		let self = this;
		// Storage.remove('settingItem')
		Storage.has('settingItem', function(err, hasKey) {
			if (err)
				throw err;
			if (!hasKey) {
				let defalutSetting = constants.defaultWidgetList;
				Storage.set('settingItem', defalutSetting, self.setSetting(defalutSetting));
				settingItem = defalutSetting;
			} else {
				Storage.get('settingItem', function(err, data) {
					if (err)
						throw err;
					settingItem = data;
					self.setSetting(settingItem);
				})
			}
		})
		this.state = {
			mainContent: 'Calendar',
			settingItem: settingItem
		}
	}

	setSetting(val) {
		this.setState({settingItem: val})
	}

	onHandlerMessage(val) {
		console.log(val);
		if (val !== this.state.mainContent) {
			this.setState({mainContent: val})
		}
	}

	render() {
		let self = this;
		return (
			<Window>
				<Header existSettingButton={true} titleName="Widget"/>
				<Content>
					<PaneGroup>
						<Sidebar onHandlerMessage={this.onHandlerMessage.bind(this)} settingItem={self.state.settingItem
							? self.state.settingItem
							: []}/> {(function() {
							if (self.state.mainContent === 'Calendar') {
								return (<Calendar/>)
							} else {
								return (
									<Pane className="padded-more">
										Hello, react-photonkit!!!
									</Pane>
								)
							}
						})()}
					</PaneGroup>
				</Content>
				<Footer/>
			</Window>
		)
	}

}

ReactDom.render(
	<MainWindow/>, document.querySelector("#main"));
