import {ReduceStore} from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher.js';
import Immutable from 'immutable';
import SystemNotificationActionTypes from '../actions/SystemNotificationActionTypes.js';
import NotificationActionTypes from '../actions/NotificationActionTypes.js';

class NotificationStore extends ReduceStore{
    constructor(){
        super(Dispatcher);

    }
    getInitialState(){
        const init = Immutable.Map();
        return init.merge({
            'userNotifications' : Immutable.List(),
            'systemNotifications'  : Immutable.List(),
            "unreadCount" : 0
        });
    }

    reduce(state,action){
        switch(action.type){
            case SystemNotificationActionTypes.SYSTEMNOTIFICATIONSLOADED:
            debugger;
                const setList = state.get('systemNotifications').merge(action.notifications);
                return state.merge({'systemNotifications' : setList});
            break;
            case SystemNotificationActionTypes.SYSTEMNOTIFICATIONDISMISS:
            debugger;
                const modifyItem = state.get('systemNotifications').get(action.id).set('display',false);
                const modifyList = state.get('systemNotifications').set(action.id, modifyItem);
                return state.merge({"systemNotifications" : modifyList});
            case NotificationActionTypes.NOTIFICATIONSLOADED:
                var setList = state.get('userNotifications').merge(action.notifications);
                return state.merge({"userNotifications" : setList, "unreadCount" : action.unread});
                break;
            case NotificationActionTypes.UPDATENOTIFICATIONS:
                var setList = state.get('userNotifications').merge(action.notifications);
                return state.merge({"userNotifications" : setList});
                break;
            case NotificationActionTypes.READNOTIFICATION:
                var getRead = state.get('userNotifications').findIndex(function(value, key, iter){
                    return value.get("ID") === action.notification.ID;
                });
                var setRead = state.get('userNotifications').set(getRead, Immutable.Map(action.notification));
                return state.merge({
                    "userNotifications" : setRead,
                    "unreadCount" : state.get('unreadCount') - 1
                    });
                break;
            default: 
                return state;
                break;
        }
    }
}
export default new NotificationStore();