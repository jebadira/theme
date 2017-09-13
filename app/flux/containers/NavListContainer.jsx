'use strict';

import React from 'react';
import Utils from 'flux/utils';
import NavListStore from '../stores/NavListStore.jsx';
import NavigationList from '../../NavigationList.jsx';
import NavListActions from '../actions/NavListActions.js';
class NavListContainer extends React.Component{
    static getStores(){
        return [NavListStore];
    }
    static calculateState(prevState, props){
        return {
            actions : {
                LoadNavItems : NavListActions.LoadNavItems,
                queryChange : NavListActions.Query,
                makeStatic : NavListActions.makeListStatic,
                rearrangeList : NavListActions.rearrangeList,
                updateNavList : NavListActions.updateNavList,
                pinToDashBoard : NavListActions.pinToDashBoard
            },
            listItems : NavListStore.getState().get("items"),
            listConfiguration : NavListStore.getState().get('itemConfiguration').toJS(),
            loading : NavListStore.getState().get('loading'),
            query : NavListStore.getState().get('query'),
            isStatic:  NavListStore.getState().get('isStatic')
        }
    }

    render(){
        return <NavigationList
                    items = {this.state.listItems}
                    itemLayout = {this.state.listConfiguration}
                    loading = {this.state.loading}
                    actions = {this.state.actions}
                    query = {this.state.query}
                    isStatic={this.state.isStatic}
                />
    }
}

export default Utils.Container.create(NavListContainer, {withProps : true});