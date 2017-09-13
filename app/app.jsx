import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppContainer from './AppContainer.jsx';
import Utils from 'flux/utils';
import UserMenuStore from './flux/stores/UserMenuStore.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ASUTheme from './styles/ASUTheme.js';
import css from './styles/globalstyles.css';
import globalDispatcher from './flux/dispatcher/dispatcher.js';
import $ from 'jquery';
//need to make the css external
import {Fabric} from 'office-ui-fabric-react';
require("../node_modules/office-ui-fabric-core/dist/css/fabric.css");
require("../node_modules/office-ui-fabric-react/dist/css/fabric.css");
const styles = require('./styles/Theme.less');
export class App extends React.Component{
    static getStores(){
        return [UserMenuStore];
    }
    static calculateState(prevState, props){
        return {
            static : UserMenuStore.getState().get('static')
        }
    }
     render(){
        return(
        <Fabric>
                <MuiThemeProvider muiTheme={getMuiTheme(ASUTheme)}>
                    <AppContainer static={this.state.static} pageTitle={this.props.pageTitle} logo={this.props.logo} content={this.props.content} />
                </MuiThemeProvider>
        </Fabric>);
    }
   
};
const appContainer = Utils.Container.create(App, {withProps: true});

injectTapEventPlugin(); 
var siteLogo = $('[data-name="SiteLogo"]');
var pageTitle = $('#pageTitle');
siteLogo.find('img').css('height', "25px");
window["globalDispatcher"] = globalDispatcher;
ReactDOM.render(React.createElement(appContainer, {logo: siteLogo[0].outerHTML, pageTitle: pageTitle[0].outerHTML}), document.getElementById("asuep_main_container"));
siteLogo.remove();
pageTitle.remove();
removeRibbon();
function removeRibbon(){
    if(window.location.search.indexOf("ToolPaneView=2") >= 0){
        return;
    }else{
            if($(".SPPageChrome").length > 0 ){
            setTimeout(removeRibbon, 500);
        }else{
            $("#s4-workspace").css('height', "100%");
            $("#ms-designer-ribbon").hide();
            $(".SPPageChrome").hide();
        }
    }
   
}