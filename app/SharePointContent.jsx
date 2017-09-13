import React from 'react';


export default class SharePointContent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style={this.props.style} dangerouslySetInnerHTML={{__html: this.props.content}}>
            </div>
        )
    
    }

}