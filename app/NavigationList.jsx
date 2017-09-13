import React from 'react';
import styles from './styles/Theme.less';
import {css} from 'office-ui-fabric-react';
import Divider from 'material-ui/Divider';
import update from 'immutability-helper';
import ListItem from './ListItem.jsx';
import {SearchBox} from 'office-ui-fabric-react';
import {Spinner, SpinnerSize} from 'office-ui-fabric-react/lib/Spinner';
import ReactGridLayout from 'react-grid-layout';
import FlatButton from 'material-ui/FlatButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
export default class NavigationList extends React.PureComponent{
    constructor(props){
        super(props);   
        this.queryChange = this.queryChange.bind(this);
        this.updateLayout = this .updateLayout.bind(this);
        this.RearrangeList = this.RearrangeList.bind(this);
        this.StaticList = this.StaticList.bind(this);
}
    updateLayout(layout){
        debugger;
        if(layout.length > 0)
        {
            this.props.actions.updateNavList(layout);
        }
        return;

    }
    RearrangeList(e){
        e.preventDefault();
        this.props.actions.rearrangeList();
    }
    StaticList(e){
        e.preventDefault();
        this.props.actions.makeStatic();
    }
    queryChange(text){
        this.props.actions.queryChange(text);
    }
    componentDidMount(){
        this.props.actions.LoadNavItems();
    }
    render(){
        var spinner = (<Spinner 
                        size={SpinnerSize.Large}
                        label="Loading Navigation..."
                        />);
        var listItems = [];
        var iter = this.props.items.entries();
        var getVal = iter.next();
        while(!getVal.done){
            if(!this.props.query || getVal.value[1].get("Name").toLowerCase().includes(this.props.query.toLowerCase())){
                listItems.push(<div 
                            
                            key={getVal.value[1].get('ID')} 
                            className={css('NavigationListItem')}>
                            <ListItem actions={this.props.actions} listItem={getVal.value[1]} />
                            <Divider />
                        </div>);
            }
            getVal = iter.next();
                if(getVal.done){
                listItems.push(
                    <div key="MoreSearchResults" className={css('NavigationListItem')}>
                        <div key="searchResultLink" className={css(styles.NavigationItemWrapper)} >
                            <span className={css(styles.NavigationItemText)}><a href={'https://asuep.sharepoint.com/sites/DeviLink/Pages/Search.aspx#k=' + this.props.query} target="_blank">Search SharePoint...</a></span>
                        </div>
                        </div>
                )
            }
        }
        
        return(
            <div>
                <SearchBox 
                className={css(styles.NavigationSearchBox)}
                    value={this.props.query} 
                    onChange={this.queryChange} 
                    onSearch={this.queryChange} 
                    labelText="Search" />
                {this.props.loading ? spinner : null}
                <ReactGridLayout layout={this.props.itemLayout}
                    isDraggable={!this.props.isStatic}
                    width={272}
                    useCSSTransforms={true}
                    onLayoutChange={!this.props.isStatic? this.updateLayout : ()=>{return;}}
                    isResizable={false}
                    margin={[0,0]}
                    containerPadding={[0,0]}
                    cols={1}
                    rowHeight={40}
                    verticalCompact={true}
                 >
                    {listItems}
                </ReactGridLayout>
                <div>
                    {this.props.isStatic ? 
                    <FlatButton primary={true} label="Rearrange" labelPosition="before" 
                        icon={<ModeEditIcon />} onClick={this.RearrangeList}
                           /> 
                          :
                    <FlatButton secondary={true} icon={<SaveIcon  />}
                    onClick={this.StaticList} />
                     }
                </div>
            </div>

        )
    }

}