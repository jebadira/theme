import $ from 'jquery';
import Dispatcher from '../dispatcher/dispatcher.js';
import SystemNotificationActionTypes from '../actions/SystemNotificationActionTypes.js'
const API ={
    loadSystemNotifications(){
        var promise = $.ajax({
            url : "https://asuep.sharepoint.com/sites/DeviLink/_api/web/lists/GetByTitle('SystemNotifications')/items?$filter=SysNotificationActive%20eq%201",
            method : "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        });
        promise.done(function(data){
            var notifications = [];
            for(var i = 0; i < data.d.results.length; i ++){
                notifications.push({
                    text : data.d.results[i].SysNotificationText,
                    type :  data.d.results[i].SysNotificationType,
                    display: true
                });
            }
            Dispatcher.dispatch({
                type : SystemNotificationActionTypes.SYSTEMNOTIFICATIONSLOADED,
                notifications : notifications
            })
        });
    }
}

export default API;