import React from 'react';
import {Layer} from 'office-ui-fabric-react/lib/Layer';
import {MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import styles from './styles/Theme.less';
import {css} from 'office-ui-fabric-react';
export default class SystemNotification extends React.PureComponent{
    constructor(props){
        super(props);
        this.dismissMessage = this.dismissMessage.bind(this);
    }
    componentDidMount(){
        this.props.actions.load();
    }
    dismissMessage(id, e){
        debugger;
        e.preventDefault();
        this.props.actions.dismiss(id);
    }
    render(){
        var layers = [];
        for (var i = 0; i < this.props.notifications.count(); i ++){
            if(this.props.notifications.get(i).get('display')){
                var key = i;
                var type  = "";
                switch(this.props.notifications.get(i).get('type')){
                    case "Information":
                    type = MessageBarType.info;
                    break;
                    case "Warning":
                    type = MessageBarType.warning;
                    break;
                    case "Error":
                    type = MessageBarType.error;
                    break;
                    case "Blocked":
                    type = MessageBarType.blocked;
                    break;
                    case "Remove" :
                    type = MessageBarType.remove;
                    break;
                    case "Severe Warning" :
                    type = MessageBarType.severeWarning;
                    break;
                    case "Success" : 
                    type = MessageBarType.success;
                    break;
                    default : 
                    type = MessageBarType.info;
                    break;
                }
                layers.push(<MessageBar 
                className={css(styles.MessageBars)}
                isMultiline={true} 
                messageBarType={type}
                onDismiss={this.dismissMessage.bind(this, key)}
                key={key}
                >
                    {this.props.notifications.get(i).get('text')}
                </MessageBar>);
            }
        }
        return (
            <div>
                <Layer hostId='layerhost'>
                    {layers}
                </Layer>
            </div>
        )
    }
}