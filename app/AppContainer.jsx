import * as React from 'react';
import Appbar from 'material-ui/AppBar';
import {css} from 'office-ui-fabric-react';
import styles from './styles/Theme.less';
import {fullWhite, ASUMaroon} from './styles/asuColors.js';
import {IconButton} from 'office-ui-fabric-react/lib/Button';

import IconWrapper from './IconWrapper.jsx';
import Paper from 'material-ui/Paper';
import NavigationList from './NavigationList.jsx';
import UserMenu from './UserMenu.jsx';
import {Panel, PanelType} from 'office-ui-fabric-react';
const FA = require('font-awesome/less/font-awesome.less');
import SharePointContent from './SharePointContent.jsx';
import NavListContainer from './flux/containers/NavListContainer.jsx';
import UserMenuContainer from './flux/containers/UserMenuContainer.jsx';
import SystemNotificationContainer from './flux/containers/SystemNotificationContainer.jsx';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Dispatcher from './flux/dispatcher/dispatcher.js';
import WebPortalActionTypes from './flux/actions/WebPortalActionTypes.js';
export default class AppContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuOpen : false,
            
        }
        this.shutDrawer = this.shutDrawer.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
    }

    componentDidMount(){
        //get a list of all of our apps.

    }
    
    shutDrawer(){
        this.setState({menuOpen: false});
    }
    openDrawer(){
        this.setState({menuOpen: true});
    }
  
    render(){
      
        var closure = this;
        return(
            
            <div>
              <Panel className={css(styles.NavigationPanel)}
                    hasCloseButton={true}
                    isOpen={this.state.menuOpen}
                    type={PanelType.smallFixedNear}
                    isBlocking={true}
                    onRenderNavigation= {
                        () => 
                            <div className={css(styles.NavigationClose)}>
                                <IconButton 
                                onClick={closure.shutDrawer}
                                    iconProps={{iconName : "Cancel"}}
                                    title="Close"
                                    ariaLabel="Close"
                            /></div>
                    }
                    onRenderBody={() =>  <div
                                            style={{height: "100%", width : "100%", overflow: "hidden"}}>
                                            <div
                                            style={{height: "99%", width : "100%", overflow: "auto", paddingRight : 13}}>
                                        <NavListContainer />
                                    </div></div> }
                    onDismissed={this.shutDrawer}
                    onDismiss={this.shutDrawer}>
                  
            </Panel >    
                <div className='layer'>
                    <div id='layerhost'></div>
                    <SystemNotificationContainer />
                </div>
                <div className="ContentContainer">
                    <div>
                        <div>
                            <Toolbar
                                style={{"minHeight" : 50, "height" : 50, "backgroundColor" : ASUMaroon}}
                                >
                                <ToolbarGroup>
                                    <SharePointContent content={this.props.logo} />
                                </ToolbarGroup>
                                <ToolbarGroup >
                                    <UserMenuContainer />
                                </ToolbarGroup>
                            </Toolbar>
                        </div>
                        <div>
                        <Appbar  
                        title= {<SharePointContent content={this.props.pageTitle} />}
                        className={css(styles.NavigationBar)}
                        titleStyle={{color: "#5c5c5c", margin : 0, paddingTop : 0, fontSize : "1.4em !important", height : 40, lineHeight: "35px"}}
                        showMenuIconButton={true}
                        onLeftIconButtonTouchTap={this.openDrawer}
                        iconStyleLeft={{height : 30, padding : 6, marginTop : 0, }}
                        style={{backgroundColor : "#fffefd", boxShadow : "box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.3)", MozBoxShadow: "box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.3)", WebkitBoxShadow: "box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.3)"}}
                         />
                         </div>
                         
                        <Paper style={{"marginLeft": 2}}>
                            <div>
                                
                            </div>
                        </Paper>
                    </div>
                </div>
                
               
            
            </div>
            );

    }

}