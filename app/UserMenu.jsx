import React from 'react';
import { ContextualMenu, DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Badge from 'material-ui/Badge';
import IconWrapper from './IconWrapper.jsx';
import FontIcon from 'material-ui/FontIcon';
import {css} from 'office-ui-fabric-react';
import styles from './styles/Theme.less';
const FA = require('font-awesome/less/font-awesome.less');
import Notification from './Notification.jsx';
import {Scrollbars} from 'react-custom-scrollbars';
export default class UserMenu extends React.PureComponent{
    componentDidMount(){
        this.props.actions.getUserInformation();
        this.props.actions.loadNotifications(this.props.userId);
    }
    render(){
        var closure = this;
        const notifications = this.props.userNotifications.notifications.toJS().map(function(notification, index){
            return <Notification actions={closure.props.actions} key={notification.ID} tooltipPosition={index > 0 ? "top-left" : "bottom-left" } notification={notification}/>
        });
        return(<div className={css(styles.UserMenuContainer)}>
            <div className={css(styles.NotificationBadge)}>
                <Badge
                badgeStyle={{fontSize: 10, width: 16, height: 16, color : "rgba(0, 0, 0, 0.87)"}}
                    badgeContent={this.props.userNotifications.count}
                    style={{padding: "16px 8px 0px 0px"}}
                    secondary={true}>
                        <IconMenu
                            menuStyle={{width: 400}}
                            targetOrigin={{
                                vertical : "top",
                                horizontal : "right"
                            }}
                            anchorOrigin={{vertical: "bottom",
                                horizontal: "left"}}
                            iconButtonElement={
                                    <IconButton className={css(styles.IconWrapper)}>
                                        <FontIcon color="#FFFFFF" className={css(FA.fa, FA["fa-bell-o"], styles.Icon)} />
                                    </IconButton>
                                     }
                            >
                            <div className={css(styles.NotificationContainer)}>
                             <Scrollbars style={{ width: 445, height: 225 }}>
                                {notifications}
                             </Scrollbars>
                            </div>
                        </IconMenu>
                </Badge>
                
            </div>
            <span className={css(styles.UserName)}>{this.props.name}
                <IconMenu
                    anchorOrigin = {{vertical: 'bottom', horizontal: 'middle'}}
                    targetOrigin = {{vertical: 'top', horizontal : 'right'}}
                    iconButtonElement={<IconButton><FontIcon color="#FFFFFF" className={css(FA.fa, FA["fa-caret-down"])} /></IconButton>}
                >
                    <MenuItem primaryText="Site Settings" onTouchTap={() => window.location.href="https://asuep.sharepoint.com/sites/DeviLink/_layouts/15/settings.aspx"} />
                    <MenuItem primaryText="Edit Page"  onTouchTap={() => window.location.href+="?ToolPaneView=2"} />
                </IconMenu>
                    

            </span>
        </div>);

    }
}