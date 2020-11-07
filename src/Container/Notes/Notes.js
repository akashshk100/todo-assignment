import React, {Component} from 'react'
import Aux from '../../HOC/Auxilliary/Auxilliary'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import NotesTable from './NotesTable/NotesTable'

class Notes extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            tabValue: 0,
            categorySelected: false,
            notes: props.notes,
            forwardedNotes: props.notes,
            categorizedNotes: null
        }
    }

    static getDerivedStateFromProps(props,state){
        state = {
            notes: props.notes,
            forwardedNotes: props.notes
        }
        return state
    }

    sortBySummary = (order) => {
        let tempNotes = null
        if(order){
            tempNotes = this.state.forwardedNotes.sort( (a,b) => {
                if (a.summary.toLowerCase() < b.summary.toLowerCase()){
                    return -1 
                }
                if (a.summary.toLowerCase() > b.summary.toLowerCase()){
                    return 1
                }
                return 0
            })
        }
        else{
            tempNotes = this.state.forwardedNotes.sort( (a,b) => {
                if (a.summary.toLowerCase() < b.summary.toLowerCase()){
                    return 1 
                }
                if (a.summary.toLowerCase() > b.summary.toLowerCase()){
                    return -1
                }
                return 0
            })
        }
        
        this.setState({
            forwardedNotes: tempNotes
        })
        // console.log(tempNotes)
    }

    sortByCreatedAt = (order) => {
        let tempNotes = null
        if(order){
            tempNotes = this.state.forwardedNotes.sort( (a,b) => {
                return a.createdAt - b.createdAt
            })
        }
        else{
            tempNotes = this.state.forwardedNotes.sort( (a,b) => {
                return b.createdAt - a.createdAt
            })
        }
        
        this.setState({
            forwardedNotes: tempNotes
        })
        // console.log(tempNotes)
    }

    sortByDueDate = (order) => {
        let tempNotes = null
        if(order){
            tempNotes = this.state.forwardedNotes.sort( (a,b) => {
                return a.dueDate - b.dueDate
            })
        }
        else{
            tempNotes = this.state.forwardedNotes.sort( (a,b) => {
                return b.dueDate - a.dueDate
            })
        }
        this.setState({
            forwardedNotes: tempNotes
        })
        // console.log(tempNotes)
    }
    
    handleChange = (event, newValue) => {
        if(this.state.tabValue !== newValue && newValue === 1){
            let tempNotes = this.state.notes.filter( (note, inedx) => {
                return note.currentState
            } )
            this.setState({
                tabValue: newValue,
                categorySelected: true,
                categorizedNotes: tempNotes
            })
        } 
        else if(this.state.tabValue !== newValue && newValue === 2){
            
            let tempNotes = this.state.notes.filter( (note, inedx) => {
                return !note.currentState
            } )
            this.setState({
                tabValue: newValue,
                categorySelected: true,
                categorizedNotes: tempNotes
            })
        }
        else{
            this.setState({
                tabValue: newValue,
                categorySelected: false
            })
        }
    }

    render = () => {

        let tableContent = (this.state.categorySelected) ? (
            <NotesTable 
                notes={this.state.categorizedNotes} 
                removeNote={this.props.removeNote}
                changeState={this.props.changeState}
                editNote={this.props.editNote}
                sortBySummary = {this.sortBySummary}
                sortByCreatedAt = {this.sortByCreatedAt}
                sortByDueDate = {this.sortByDueDate}   
            />
        ) : (
            <NotesTable 
                notes={this.state.forwardedNotes} 
                removeNote={this.props.removeNote}
                changeState={this.props.changeState}
                editNote={this.props.editNote}
                sortBySummary = {this.sortBySummary}
                sortByCreatedAt = {this.sortByCreatedAt}
                sortByDueDate = {this.sortByDueDate}   
            />
        )
        
        return(
            <Aux>
                <Tabs
                    style={{ borderBottom: '1px solid #e8e8e8' }}
                    value={this.state.tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}
                >
                    <Tab label="All" style={{minWidth: "fit-content" }}/>
                    <Tab label="Pending" style={{minWidth: "fit-content" }}/>
                    <Tab label="Completed" style={{minWidth: "fit-content" }}/>
                </Tabs>
                <div style={ {marginTop: "10px"} }>
                    {tableContent}
                </div>
            </Aux>
        )
    }
}

export default Notes