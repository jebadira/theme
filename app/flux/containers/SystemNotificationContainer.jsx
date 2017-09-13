import React from 'react';
import Utils from 'flux/utils';
import NotificationStore from '../stores/NotificationStore.jsx';
import SystemNotification from '../../SystemNotification.jsx';
import SystemNotificationActions from '../actions/SystemNotificationActions.js';
class SystemNotificationContainer extends React.Component{
    static getStores(){
        return [NotificationStore];
    }

    static calculateState(prevState, props){
        return {
            actions : {
                load :  SystemNotificationActions.loadSystemNotifications,
                dismiss : SystemNotificationActions.dismiss
            },
            notifications : NotificationStore.getState().get('systemNotifications'),
        }
    }

    render(){
        return <SystemNotification actions={this.state.actions} notifications={this.state.notifications} />
    }


}


export default Utils.Container.create(SystemNotificationContainer, {withProps : false});