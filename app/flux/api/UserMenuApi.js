import Dispatcher from '../dispatcher/dispatcher.js';
import UserMenuActionTypes from '../actions/UserMenuActionTypes.js';
import $ from 'jquery';

const API={
    getUserInformation(){
        var getCurrentUser = $.ajax({
            url: "https://asuep.sharepoint.com/sites/DeviLink/_api/Web/CurrentUser?$select=Id,Title",
            method : "GET",
            headers: { "Accept": "application/json;odata=verbose" }
            });
        getCurrentUser.done(function(data){
            var userID = data.d.Id;
            var username = data.d.Title;
            Dispatcher.dispatch({
                type: UserMenuActionTypes.USERLOADED,
                user : {
                    userID: userID,
                    username : username
                }
            });
           
        });
    }

}

export default API;