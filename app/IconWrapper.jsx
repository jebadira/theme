import React from 'react';
import {css} from 'office-ui-fabric-react';
const FA = require('font-awesome/less/font-awesome.less');
const styles = require('./styles/Theme.less');
export default class IconWrapper extends React.PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        return <span className={css(styles.IconWrapper)}>
            <i className={css(styles.Icon, FA.fa, FA[this.props.icon], FA["fa-fw"])}></i>
        </span>
    }
}