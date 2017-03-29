import React, {Component} from "react";
import ReactDom from "react-dom";
import {Window, Content, PaneGroup, Pane, CheckBox, Button} from "react-photonkit";
import CheckBoxGroup from './components/CheckBoxGroup.js'
import nw from './backend/nw.interface.js'
import constants from './constants.js'
import Storage from 'electron-json-storage';
import Dialog from 'boron/ScaleModal';
import Utils from './utils/utils.js'

import Header from "./header.jsx"
import Footer from "./footer.jsx";

var utils = new Utils();
var modalStyle = {
    width: '80%'
};

require('../index.scss');

class SettingWindow extends Component {
	constructor(props) {
		super(props);
        let settingItem;
        let self = this;
        Storage.get('settingItem', function(err, data) {
            if (err)
                throw err;
            settingItem = data;
            self.setSetting(settingItem);
        })
		this.state = {
            settingItem: settingItem
		}
	}

    hideModal(){
        this.refs.modal.hide();
    }

    setSetting(val) {
		this.setState({settingItem: val})
	}

    radioOnChange(e){
        e.target.checked = (e.target.checked === true ? true: false);
        let clickItemName = e.target.name;
        this.state.settingItem[clickItemName].state = e.target.checked;
        this.refs.modal.show();
    }

    submitSetting(){
        Storage.set('settingItem', this.state.settingItem, () => {this.refs.modal.show()});
    }

	render() {
		let self = this;
        let validTabs = utils.getAllWidget(this.state.settingItem);
        let keyCount = 0;
		return (
			<Window>
				<Header existSettingButton={false} titleName="Setting"/>
				<Content>
					<PaneGroup className="settingContainer">
                        <CheckBoxGroup>
                        {
                            validTabs.map(function(item){
                                return (
                                    <CheckBox label={item.name} key={keyCount++} defaultChecked={item.state===true?true:false} onChange={self.radioOnChange.bind(self)} name={item.id}/>
                                )
                            })
                        }
                        <Button text="OK" ptStyle="primary" type="submit" onClick={self.submitSetting.bind(self)}/>
                        </CheckBoxGroup>
                        <Dialog ref="modal" modalStyle={modalStyle} className="success-dialog">
                            <div className="word-content">Success</div>
                            <button onClick={this.hideModal.bind(self)} className="back-button">Close</button>
                        </Dialog>
					</PaneGroup>
				</Content>
				<Footer/>
			</Window>
		)
	}
}

ReactDom.render(
	<SettingWindow/>, document.getElementById('app'));
