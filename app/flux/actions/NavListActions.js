import API from '../api/NavListApi.js';
import Dispatcher from '../dispatcher/dispatcher.js';
import NavListActionTypes from './NavListActionTypes.js';
import NavListStore from '../stores/NavListStore.jsx';
const Actions = {
    LoadNavItems(){
        if(NavListStore.getState().get('items').count() < 1){
            API.GetNavListItems();
        }
        
    },
    Query(text){
        Dispatcher.dispatch({
            type : NavListActionTypes.QUERY,
            text : text
        });
    },
    makeListStatic(){
        var navItems = NavListStore.getState().get('itemConfiguration');
        API.save(navItems);
    },
    rearrangeList(){
        Dispatcher.dispatch({
            type: NavListActionTypes.REARRANGENAVLIST
        })
    },
    updateNavList(layout){
        
        Dispatcher.dispatch({
            type: NavListActionTypes.UPDATENAVLIST,
            config : layout
        });
    },
    pinToDashBoard(itemID){
        Dispatcher.dispatch({
            type : "PINTODASHBOARD",
            appID : itemID
        });
    }

}
export default Actions;