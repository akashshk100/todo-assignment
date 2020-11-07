import React, {Component} from 'react'
import Layout from './Components/Layout/Layout'
import AddNoteModal from './Container/AddNoteModal/AddNoteModal'
import SearchControls from './Components/SearchControls/SearchControls'
import Notes from './Container/Notes/Notes'

class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      addNoteModal: false,
      noteId: 1,
      notes: [
        { 
          id: 0,
          currentState: false, 
          summary: "Lorem ipsum dolor.",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra eget felis at condimentum. Maecenas a massa vitae ex posuere.",
          priority: "low",
          createdAt: new Date(2020, 11, 6),
          dueDate: new Date(2020, 11, 15)
        }
      ]
    }
  }

  openAddNoteModal = () => {
    this.setState({
      addNoteModal: true
    })
  }

  closeAddNoteModal = () => {
    this.setState({
      addNoteModal: false
    })
  }

  addNote = (summary, description, dueDate, priority) => {
    let tempNotes = this.state.notes
    tempNotes.push({
      id: this.state.noteId,
      currentState: true,
      summary: summary,
      description: description,
      createdAt: new Date(),
      dueDate: dueDate,
      priority: priority
    })
    this.setState({
      notes: tempNotes
    })
    this.setState({
      noteId: this.state.noteId+1
    })
    // console.log(tempNotes)
    // console.log(this.state.notes)
  }

  editNote = (id, summary, description, dueDate, priority) => {
    let tempNotes = this.state.notes
    let tempIndex = -1
    for (let index = 0; index < tempNotes.length; index++) {
      if(tempNotes[index].id === id){
        tempIndex = index
        break
      }
    }
    tempNotes[tempIndex].summary = summary
    tempNotes[tempIndex].description = description
    tempNotes[tempIndex].dueDate = dueDate
    tempNotes[tempIndex].priority = priority
    this.setState({
      notes: tempNotes
    })
  }

  removeNote = (id) => {
    let tempNotes = this.state.notes
    let tempIndex = -1
    for (let index = 0; index < tempNotes.length; index++) {
      if(tempNotes[index].id === id){
        tempIndex = index
        break
      }
    }
    tempNotes.splice(tempIndex, 1)
    this.setState({
      notes: tempNotes
    })
  }

  changeState = (id) => {
    let tempNotes = this.state.notes
    let tempIndex = -1
    for (let index = 0; index < tempNotes.length; index++) {
      if(tempNotes[index].id === id){
        tempIndex = index
        break
      }
    }
    tempNotes[tempIndex].currentState = !tempNotes[tempIndex].currentState
    this.setState({
      notes: tempNotes
    })
  }
  
  render(){
    return(
      <div style={ {width: "70%", margin: "auto" } }>
        <Layout openAddNoteModal={this.openAddNoteModal}>
          <AddNoteModal 
            open={this.state.addNoteModal} 
            closeAddNoteModal={this.closeAddNoteModal} 
            disabled={false}
            addNote={this.addNote} 
          />
          <div style= { {marginTop: "30px"} }>
            <SearchControls />
          </div>
          <div style= { {marginTop: "30px"} }>
            <Notes 
              notes = {this.state.notes} 
              removeNote = {this.removeNote}
              changeState = {this.changeState}
              editNote = {this.editNote}
              ></Notes>
          </div>
        </Layout>
      </div>
    )
  }
} 

export default App;
