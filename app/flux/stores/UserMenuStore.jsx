import {ReduceStore} from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher.js';
import Immutable from 'immutable';
import UserMenuActionTypes from '../actions/UserMenuActionTypes.js';
import WebPortalActionTypes from '../actions/WebPortalActionTypes.js';
class UserMenuStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        const init = Immutable.Map();
        return init.merge({
            name : '',
            items : Immutable.List(),
            userID : 0,
            static : true
        });
    }


    reduce(state, action){
        switch(action.type){
            case UserMenuActionTypes.USERLOADED:
                return state.merge({'name' : action.user.username, 'userID' : action.user.userID});
                break;
            default:
                return state;
            break;
        }
    }
}
export default new UserMenuStore();
