import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import MomentUtils from '@date-io/dayjs';
import { KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Aux from '../../HOC/Auxilliary/Auxilliary'

class AddNoteModal extends Component {

    constructor(props){
        super(props)
        this.state = {
            open: null,
            summary: "",
            summaryCorrect: true,
            description: "",
            descriptionCorrect: true,
            date: new Date(),
            priority: "none"
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        // console.log(props.open)
        if((props.id || props.id === 0) && state.open !== props.open ){
            // console.log("inside if")
            state = {
                open: props.open,
                summary: props.summary,
                description: props.description,
                date: props.dueDate,
                priority: props.priority
            }
        }
        else{
            state = {
                open: props.open
            }
        }
        return state
    }

    handleSummary = (event) => {
        this.setState({
            summary: event.target.value
        })
    }

    checkSummary = () => {
        if(this.state.summary.length > 140 || this.state.summary.length < 10){
            this.setState({
                summaryCorrect: false
            })
            return false
        }
        else{
            this.setState({
                summaryCorrect: true
            })
            return true
        }
    }

    handleDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    checkDescription = () => {
        if(this.state.description.length > 500 || this.state.description.length < 10){
            this.setState({
                descriptionCorrect: false
            })
            return false
        }
        else{
            this.setState({
                descriptionCorrect: true
            })
            return true
        }
    }

    handleDate = (date) => {
        let tempDate = new Date(date.year(), date.month(), date.date())
        this.setState({
            date: tempDate
        })
    }

    handlePriority = (event) => {
        this.setState({
            priority: event.target.value
        })
    }

    addNote = () => {
        if(this.checkSummary() & this.checkDescription()){
            if(this.props.id || this.props.id === 0){
                this.props.addNote(this.props.id, this.state.summary, this.state.description, this.state.date, this.state.priority)
            }
            else{
                this.props.addNote(this.state.summary, this.state.description, this.state.date, this.state.priority)
            }
            this.setState({
                summary: "",
                description: "",
                date: new Date(),
                priority: "none"
            })
            this.props.closeAddNoteModal()
        }
    }

    render () {

        let dialogActionContent = (this.props.disabled) ? (
            <Aux>
                <Button variant="contained" onClick={this.props.closeAddNoteModal} color="primary">
                    Close
                </Button>
            </Aux>
        ) : (
            <Aux>
                <Button variant="contained" onClick={this.props.closeAddNoteModal} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={this.addNote} color="primary">
                    Save
                </Button>
            </Aux>
        )

        return(
            <Dialog 
                open={this.state.open}
                fullWidth={true}
                maxWidth="sm"
            >
                <DialogTitle>{ (this.props.disabled) ? "Note" : "Add New Note" }</DialogTitle>
                <DialogContent>
                    <Grid container style = {{margin: "20px 0px"}}>
                        <TextField
                            disabled={this.props.disabled}
                            autoFocus
                            value={this.state.summary}
                            onChange={this.handleSummary}               
                            label="Summary"
                            variant="outlined"
                            fullWidth
                            required
                            error={!this.state.summaryCorrect}
                            helperText= { (this.state.summaryCorrect) ? null : "Summary Incorrect" }
                        />
                    </Grid>
                    <Grid container style = {{margin: "20px 0px"}}>
                        <TextField
                            disabled={this.props.disabled}
                            value={this.state.description}
                            onChange={this.handleDescription}                
                            label="Description"
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                            required
                            error={!this.state.descriptionCorrect}
                            helperText= { (this.state.descriptionCorrect) ? null : "Desciption Incorrect" }
                        />
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                                <KeyboardDatePicker
                                    disabled={this.props.disabled}
                                    clearable
                                    value={this.state.date}
                                    inputVariant="outlined"
                                    placeholder="10/10/2010"
                                    onChange={ date => this.handleDate(date) }
                                    minDate={new Date()}
                                    format="MM/DD/YYYY"
                                    style={{ width: "95%", marginRight: "7px"}}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined" style={{ width: "95%", marginLeft: "13px"}}>
                                    <InputLabel id="select-priority">Priority</InputLabel>
                                    <Select
                                        disabled={this.props.disabled}
                                        labelId="select-priority"
                                        label="Priority"
                                        value={this.state.priority}
                                        onChange={ this.handlePriority}
                                    >
                                        <MenuItem value="none">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="low">Low</MenuItem>
                                        <MenuItem value="medium">Medium</MenuItem>
                                        <MenuItem value="high">High</MenuItem>
                                    </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {dialogActionContent}
                </DialogActions>
            </Dialog>
        )
    }
}

export default AddNoteModal