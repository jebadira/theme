'use strict';

import React from 'react';
import Utils from 'flux/utils';
import UserMenuStore from '../stores/UserMenuStore.jsx';
import UserMenu from '../../UserMenu.jsx';
import UserMenuActions from '../actions/UserMenuActions.js';
import NotificationActions from '../actions/NotificationActions.js'; 
import NotificationStore from '../stores/NotificationStore.jsx';
class UserMenuContainer extends React.Component{
    static getStores(){
        return [UserMenuStore, NotificationStore];
    }

    static calculateState(prevState, props){
        return {
            actions : {
                getUserInformation : UserMenuActions.getUserInformation,
                loadNotifications : NotificationActions.LoadNotifications,
                readNotification : NotificationActions.ReadNotification
            },
            userNotifications : {
                notifications : NotificationStore.getState().get('userNotifications'),
                count : NotificationStore.getState().get('unreadCount')
            },
            listItems : [],
            Name : UserMenuStore.getState().get('name'),
            userId: UserMenuStore.getState().get('userID')
        }
    }

    render(){
        return <UserMenu
                    userId={this.state.userId}
                    name={this.state.Name}
                    actions={this.state.actions}
                    items={this.state.listItems}
                    userNotifications={this.state.userNotifications}/>
    }
}
export default Utils.Container.create(UserMenuContainer, {withProps : true});