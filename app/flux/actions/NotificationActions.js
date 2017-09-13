import API from '../api/NotificationApi.js';
import $ from 'jquery';
import Dispatcher from '../dispatcher/dispatcher.js';
import NotificationActionTypes from './NotificationActionTypes.js';
const Actions = {
    addNotification(notification){
        Dispatcher.dispatch({
            type: NotificationActionTypes.ADDNOTIFICATION,
            notification : notification
        });
    },
    LoadNotifications(userId){
        API.loadNotifications(userId);
    },
    UpdateNotifications(){
        API.updateNotifications();
    },
    ReadNotification(notification){
        API.ReadNotification(notification);
        notification.viewed = true;
        Dispatcher.dispatch({
            type: NotificationActionTypes.READNOTIFICATION,
            notification : notification
        })
    }
};

export default Actions;