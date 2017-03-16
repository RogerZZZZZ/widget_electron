import React from "react";
import ReactDom from "react-dom";
import { Window, Content, PaneGroup ,Pane } from "react-photonkit";

import Header from "./header.jsx"
import Footer from "./footer.jsx";
import Sidebar from "./sidebar.jsx"

require('../index.scss');

class MainWindow extends React.Component{

    onHandlerMessage(val) {
        console.log(val);
    }


    render() {
        return (
            <Window>
              <Header />
              <Content>
                <PaneGroup>
                  <Sidebar onHandlerMessage={this.onHandlerMessage.bind(this)} nameCase="test"/>
                  <Pane className="padded-more">
                    Hello, react-photonkit!!!
                  </Pane>
                </PaneGroup>
              </Content>
              <Footer />
            </Window>
        )
    }

}

ReactDom.render(
  <MainWindow />
  , document.querySelector("#main"));
