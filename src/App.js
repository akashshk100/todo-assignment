import React, {Component} from 'react'
import Layout from './Components/Layout/Layout'
import AddNoteModal from './Container/AddNoteModal/AddNoteModal'
import SearchControls from './Components/SearchControls/SearchControls'
import Notes from './Container/Notes/Notes'


const sortBy = (notes) => {
  let groupedNotes = {
    none: [],
    low: [],
    medium: [],
    high: []
  }
  notes.forEach( note => {
    let notePriority = note.priority
    groupedNotes[notePriority].push(note)
  } )
  return groupedNotes
}


class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      searchActive: false,
      sortedBy: "none",
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
      ],
      forwardedNotes:  [
        { 
          id: 0,
          currentState: false, 
          summary: "Lorem ipsum dolor.",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra eget felis at condimentum. Maecenas a massa vitae ex posuere.",
          priority: "low",
          createdAt: new Date(2020, 11, 6),
          dueDate: new Date(2020, 11, 15)
        }
      ],
      searchNotes: null
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
      notes: tempNotes,
      forwardedNotes: tempNotes,
      noteId: this.state.noteId+1,
      sortedBy: "none"
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
      notes: tempNotes,
      forwardedNotes: tempNotes,
      sortedBy: "none"
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
      notes: tempNotes,
      forwardedNotes: tempNotes,
      sortedBy: "none"
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
      notes: tempNotes,
      forwardedNotes: tempNotes,
      sortedBy: "none"
    })
  }

  handleSearch = (searchString) => {
    if(searchString.length !== 0){
      let tempNotes = this.state.forwardedNotes.filter( (note, index) => {
        console.log(note.summary.toLowerCase().includes(searchString.toLowerCase()))
        return note.summary.toLowerCase().includes(searchString.toLowerCase())  
      })
      this.setState({
        searchNotes: tempNotes,
        searchActive: true
      })
    }
    else{
      this.setState({
        searchActive: false
      })
    }
  }

  handleSortBy = (value) => {
    if(value === "priority"){
      let tempNotes = sortBy(this.state.forwardedNotes)
      let concatedNotes = tempNotes.none.concat(tempNotes.low.concat(tempNotes.medium.concat(tempNotes.high)))
      this.setState({
        sortedBy: value,
        forwardedNotes: concatedNotes
      })
    }
    else{
      this.setState({
        sortedBy: value,
        forwardedNotes: this.state.notes
      })
    }
  }

  render = () => {

    let notesContent = (this.state.searchActive) ? (
      <Notes 
        notes = {this.state.searchNotes} 
        removeNote = {this.removeNote}
        changeState = {this.changeState}
        editNote = {this.editNote}
      />
    ) : (
      <Notes 
        notes = {this.state.forwardedNotes} 
        removeNote = {this.removeNote}
        changeState = {this.changeState}
        editNote = {this.editNote}
      />
    )

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
            <SearchControls handleSearch={this.handleSearch} handleSortby={this.handleSortBy} sortedBy={this.state.sortedBy}/>
          </div>
          <div style= { {marginTop: "30px"} }>
            {notesContent}
          </div>
        </Layout>
      </div>
    )
  }
} 

export default App;
