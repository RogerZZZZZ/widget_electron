import React from "react";
import {Toolbar, Actionbar, Button, ButtonGroup} from "react-photonkit";
import event from './backend/event';
import { EVENT } from './backend/constants';

class Header extends React.Component {
    
    _openSettingWindow(){
        event.emit(EVENT.OPEN_SETTINGS_WINDOW);
    }

    _closeWindow() {
        event.emit(EVENT.CLOSE_WINDOW);
    }

	render() {
        var self = this;
		return (
			<Toolbar title={self.props.titleName}>
				<Actionbar>
					<ButtonGroup>
                        {(function(){
                            if(!self.props.existSettingButton){
                                return (
                                    <Button glyph="reply" onClick={self._closeWindow}/>
                                )
                            }else{
                                return(
                                    <div>
            						<Button glyph="cog" onClick={self._openSettingWindow}/>
                                    </div>
                                )
                            }
                        })()}
					</ButtonGroup>
				</Actionbar>
			</Toolbar>
		);
	}
}

export default Header;
