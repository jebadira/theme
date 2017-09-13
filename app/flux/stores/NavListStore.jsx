import {ReduceStore} from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import NavListActionTypes from '../actions/NavListActionTypes.js';
import Immutable from 'immutable';
class NavListStore extends ReduceStore{
    constructor(){
        super(Dispatcher);
    }

    getInitialState(){
        const init = Immutable.Map();
        return init.merge(
            {"items" : Immutable.OrderedMap(),
             "loading" : true,
             "query" : '',
            'itemConfiguration' : Immutable.List(),
            'isStatic' : true
            });
    }


    reduce(state, action){
        switch(action.type){
           
            case NavListActionTypes.NAVLOADED: 
                const addItems = state.get('items').merge(action.links);
                return state.merge({"items": addItems, "loading" : false, "itemConfiguration" : action.configuration});
                break;
            case NavListActionTypes.NAVLOADING:
                const setLoading = state.set("loading", true);
                return setLoading;
                break;
            case NavListActionTypes.QUERY: 
                return state.merge({"query" : action.text});
                break;
            case NavListActionTypes.MAKELISTSTATIC:
                return state.merge({"isStatic" : true});
                break;
            case NavListActionTypes.REARRANGENAVLIST:
                return state.merge({"isStatic" : false});
                break;
            case NavListActionTypes.UPDATENAVLIST:
                debugger;
                return state.merge({"itemConfiguration" : action.config});
            default:

                return state;
                break;
        }
    }
}

export default new NavListStore();