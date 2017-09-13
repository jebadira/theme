import Dispatcher from '../dispatcher/dispatcher.js';
import NotificationActionTypes from '../actions/NotificationActionTypes.js';
import $ from 'jquery';
const API ={
    loadNotifications(userId){
        //some promise
         var getCurrentUser = $.ajax({
            url: "https://asuep.sharepoint.com/sites/DeviLink/_api/Web/CurrentUser?$select=Id,Title",
            method : "GET",
            headers: { "Accept": "application/json;odata=verbose" }
            });
        getCurrentUser.done(function(data){
            var userID = data.d.Id;
            var username = data.d.Title;
          
           
            var getNotifications = $.ajax({
                    url: "https://asuep.sharepoint.com/sites/DeviLink/_api/Lists/GetByTitle('Notifications')/items?$filter=UserUserNotificationsId%20eq%20" + userID + "&$orderby=ViewedUserNotifications,Created%20desc&$top=5",
                    method : "GET",
                    headers: { "Accept": "application/json;odata=verbose" }
                });
                getNotifications.done(function(data){
                    var notifications = [];
                    for(var i = 0; i < data.d.results.length; i++){
                        notifications.push({
                            title: data.d.results[i].Title,
                            verb : data.d.results[i].VerbUserNotifications,
                            Object : data.d.results[i].ObjectUserNotifications,
                            userId : data.d.results[i].UserUserNotifications,
                            Actor: data.d.results[i].ActorUserNotifications,
                            Url : data.d.results[i].UrlUserNotifications,
                            ID : data.d.results[i].Id,
                            viewed : data.d.results[i].ViewedUserNotifications
                        });
                    }
                    var unreadNotifications = $.ajax({
                        url : "https://asuep.sharepoint.com/sites/DeviLink/_api/Lists/GetByTitle('Notifications')/items?$filter=(UserUserNotificationsId%20eq%20" + userID + ")and(ViewedUserNotifications%20eq%200)",
                        method : "GET",
                        headers: { "Accept": "application/json;odata=verbose" }  
                    });
                    unreadNotifications.done(function(data){
                        var unread = data.d.results.length;
                        Dispatcher.dispatch({
                            type: NotificationActionTypes.NOTIFICATIONSLOADED,
                            notifications : notifications,
                            unread : unread
                        });
                    });
                });
            });
            
        Dispatcher.dispatch({
            type: NotificationActionTypes.NOTIFICATIONSLOADED,
            notifications : null
        })
    },
    updateNotifications(){
        Dispatcher.dispatch({
            type: NotificationActionTypes.UPDATENOTIFICATIONS,
            notifications: null
        })
    },
    ReadNotification(notification){
        var formdigest = $.ajax({
                    url: "https://asuep.sharepoint.com/sites/DeviLink/_api/contextinfo",
                    method : "POST",
                    headers: { "Accept": "application/json;odata=verbose" }
                });
            formdigest.done(function(data){
                var digest = data.d.GetContextWebInformation.FormDigestValue;
                var postData = $.ajax({
                    url: "https://asuep.sharepoint.com/sites/DeviLink/_api/Lists/GetByTitle('Notifications')/items(" + notification.ID + ")",
                    method : "POST",
                    headers: { "Accept": "application/json;odata=verbose",
                                    "X-RequestDigest" : digest,
                                    "IF-MATCH" : "*",
                                    "X-HTTP-Method" : "MERGE",
                                    'content-type' : "application/json;odata=verbose",
                                },
                    data : JSON.stringify({
                        ActorUserNotifications : notification.Actor,
                        ID : notification.ID,
                        ViewedUserNotifications: notification.viewed,
                        UrlUserNotifications : notification.Url,
                        UserUserNotificationsId : notification.userId,
                        ObjectUserNotifications : notification.Object,
                        VerbUserNotifications : notification.verb,
                        '__metadata' : {'type' : 'SP.Data.NotificationsListItem'}
                    })
                });
            });
        
        return;
    }
}

export default API;