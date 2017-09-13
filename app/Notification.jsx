import React from 'react';
import {css} from "office-ui-fabric-react";
import styles from './styles/Theme.less';
import NavigationCheck from 'material-ui/svg-icons/navigation/check'
import IconButton from 'material-ui/IconButton';
export default class Notification extends React.PureComponent{
    constructor(props){
        super(props);
        this.ReadNotification = this.ReadNotification.bind(this);
    }

    ReadNotification(notification) { 
        //call some sort of action.
        this.props.actions.readNotification(notification);
    }


    render(){
        var viewed = this.props.notification.viewed ? styles.NotificationViewed : styles.Notification;
        return (<div className={css(viewed)}>
                    <a className={css(styles.NotificationBody)} href={this.props.notification.Url}>
                        <span>You {this.props.notification.verb} {this.props.notification.Object} {this.props.notification.Actor}</span>
                    </a>
                    {this.props.notification.viewed ? null : 
                        <IconButton className={styles.NotificationCheck} 
                        tooltip="Mark as read" onClick={() => this.ReadNotification(this.props.notification)}
                        tooltipPosition={this.props.tooltipPosition}>
                            <NavigationCheck />
                        </IconButton>
                    }
                </div>);
    }
}