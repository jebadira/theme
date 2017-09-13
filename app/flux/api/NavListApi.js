import Dispatcher from '../dispatcher/dispatcher.js';
import NavListActionTypes from '../actions/NavListActionTypes.js';
import UserMenuStore from '../stores/UserMenuStore.jsx';
import $ from 'jquery';
const API = {
   save(config){
    var getCurrentUser = $.ajax({
            url: "https://asuep.sharepoint.com/sites/DeviLink/_api/Web/CurrentUser?$select=Id,Title",
            method : "GET",
            headers: { "Accept": "application/json;odata=verbose" }
        });
        getCurrentUser.done(function(data){
            var userID = data.d.Id;
            var username = data.d.Title;
            var listItem = $.ajax({
                url: "https://asuep.sharepoint.com/sites/DeviLink/_api/lists/GetByTitle('UserConfiguration')/items?$filter=UserUserConfigFieldStringId eq " + userID,
                method: "GET",
                headers : { "Accept": "application/json;odata=verbose" }
            });
            listItem.done(function(data){

                var itemId = data.d.results[0].Id;
                var formdigest = $.ajax({
                    url: "https://asuep.sharepoint.com/sites/DeviLink/_api/contextinfo",
                    method : "POST",
                    headers: { "Accept": "application/json;odata=verbose" }
                });
                
                formdigest.done(function(data){
                    var digest = data.d.GetContextWebInformation.FormDigestValue;
                    debugger;
                    var JSconfig = config.toJS();
                    var payloadArr = [];
                    for(var i = 0; i < JSconfig.length; i ++){
                        payloadArr.push({w: JSconfig[i].w,
                                        h : JSconfig[i].h,
                                        x : JSconfig[i].x,
                                        y: JSconfig[i].y,
                                        i : JSconfig[i].i,
                                });
                    }
                    var userConfigJS = { "nav" : payloadArr};
                    var promise = $.ajax({
                        url: "https://asuep.sharepoint.com/sites/DeviLink/_api/lists/GetByTitle('UserConfiguration')/items(" + itemId + ")",
                        headers: { "Accept": "application/json;odata=verbose",
                            "X-RequestDigest" : digest,
                            "IF-MATCH" : "*",
                            "X-HTTP-Method" : "MERGE",
                            'content-type' : "application/json;odata=verbose",
                            },
                        method : "POST",
                        data: JSON.stringify({
                           NavConfigUserConfig: JSON.stringify(userConfigJS),
                           '__metadata'  : {'type' : 'SP.Data.UserConfigurationListItem'}
                        })
                    });
                   
                    promise.done(function(data){
                        Dispatcher.dispatch({
                            type : NavListActionTypes.MAKELISTSTATIC
                        });
                    });
                });
            });
        });
   },
    GetNavListItems(){
         var filterString = "";
         var promise = $.ajax({
            url: "https://asuep.sharepoint.com/sites/DeviLink/_api/web/lists/GetByTitle('DevilLinkAppList')/items?" + filterString,
            method : "GET",
            contentType: "application/json",
            dataType: "json",
            beforeSend : function(xhr){
                xhr.setRequestHeader("accept", "application/json;"); 
            },
        });
        promise.done(function(data){
            var links = {};
            var getuserId = $.ajax({
                url: "https://asuep.sharepoint.com/sites/DeviLink/_api/Web/CurrentUser?$select=Id",
                method : "GET",
                headers: { "Accept": "application/json;odata=verbose" }
            });
            for(var i = 0; i < data.value.length; i++){
                links[data.value[i].ID] =  {
                            Name : data.value[i].DevilLinkAppListAppName,
                            ID : data.value[i].DevilLinkAppListAppID,
                            Url : data.value[i].DevilLinkAppListAppUrl,
                            Icon : data.value[i].DevilLinkAppListIconClass,
                            Link : data.value[i].DevilLinkAppListLinkUrl,
                        }
            }
            getuserId.done(function(data){
                var userId = data.d.Id;
                var getListConfiguration = $.ajax({
                    url: "https://asuep.sharepoint.com/sites/DeviLink/_api/lists/GetByTitle('UserConfiguration')/items?$filter=UserUserConfigFieldStringId eq " + userId,
                    method : "GET",
                    contentType: "application/json",
                    dataType: "json",
                });
                getListConfiguration.done(function(data){
                    var listconfiguartion = JSON.parse(data.value[0].NavConfigUserConfig).nav;
                    Dispatcher.dispatch({
                        type: NavListActionTypes.NAVLOADED,
                        links : links,
                        configuration: listconfiguartion
                    });
                });
            });
        });
    }
};

export default API;