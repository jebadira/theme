import API from '../api/UserMenuApi.js';
import Dispatcher from '../dispatcher/dispatcher.js';
const Actions = {
    getUserInformation(){
        API.getUserInformation();
    }
}

export default Actions;