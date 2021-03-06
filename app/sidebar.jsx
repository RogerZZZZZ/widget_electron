import React from "react";
import Utils from './utils/utils.js'
import {Pane, NavGroup, NavTitle, NavGroupItem} from "react-photonkit";

var utils = new Utils();

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			settingItem: this.props.settingItem
				? this.props.settingItem
				: []
		}
	}

	onSelect(index, settingSets) {
		this.props.onHandlerMessage(settingSets[index].id);
	}

	render() {
		let settingSets = utils.findActiveTabs(this.props.settingItem);
		let self = this;
		if (settingSets.length > 0) {
			let count = 0;
			return (
				<Pane ptSize="sm" sidebar>
					<div onSelect={this.onSelect.bind(self)}>
						<NavTitle>Navigation</NavTitle>
						{
							settingSets.map(function(item) {
								return (<NavGroupItem glyph={item.icon} text={item.name} key={count} onClick={self.onSelect.bind(self, count++, settingSets)}/>)
							})
						}
					</div>
				</Pane>
			)
		} else {
			return (
				<Pane ptSize="sm" sidebar>
				<div onSelect={this.onSelect.bind(self)}>
					<NavTitle>No Widget has been chosen</NavTitle>
				</div>
				</Pane>
			)
		}
	}
}

export default Sidebar;
