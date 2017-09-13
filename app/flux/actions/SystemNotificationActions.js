import API from '../api/SystemNotificationApi.js';
import Dispatcher from '../dispatcher/dispatcher.js';
import SystemNotificationActionTypes from './SystemNotificationActionTypes.js';
import $ from 'jquery';
const Actions = {
    loadSystemNotifications(){
        API.loadSystemNotifications();
    },
    dismiss(id){
        debugger;
        var promise = $.Deferred(function(){
            this.resolve();
        });
        promise.done(function(){
             Dispatcher.dispatch({
                type : SystemNotificationActionTypes.SYSTEMNOTIFICATIONDISMISS,
                id: id 
            });
        });
    }
}
export default Actions;