import React from 'react';
import {css} from 'office-ui-fabric-react';
import {ContextualMenu, DirectionalHint} from 'office-ui-fabric-react/lib/ContextualMenu';
import {IconButton} from 'office-ui-fabric-react/lib/Button';
import IconWrapper from './IconWrapper.jsx';
import styles from './styles/Theme.less';
export default class ListItem extends React.Component{
    constructor(props){
        super(props);
        this.PinToDashBoard = this.PinToDashBoard.bind(this);
    }
    PinToDashBoard(listItemID, e){
        debugger;
        this.props.actions.pinToDashBoard(listItemID);
    }
    render(){
        debugger;
        return (
            <div key={this.props.listItem.get('ID')} className={css(styles.NavigationItemWrapper)} >
                <IconWrapper icon={this.props.listItem.get('Icon')}/>
                <span className={css(styles.NavigationItemText)}>{this.props.listItem.get("Name")}</span>
                {!this.props.listItem.get("Url") ? null : <IconButton className={css(styles.NavigationMoreButton)} href="#" title="More" menuIconProps={{iconName : 'More'}}
                menuProps={
                        { 
                            items: [
                                {
                                    key : 'PinToDashBoard',
                                    name : 'Pin To Dash Board',
                                    onClick : this.PinToDashBoard.bind(this, this.props.listItem.get("ID"))
                                }
                            ]
                        }
                    }/>}
                
                </div>
        )
    }
}