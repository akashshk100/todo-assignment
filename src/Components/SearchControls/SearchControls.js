import React, {useState} from 'react'
import Aux from '../../HOC/Auxilliary/Auxilliary'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'

const SearchControls = (props) => {

    let [priority, setPriority] = useState("none")
    let [keyword, setKeyword] = useState("")

    const handleKeyword = (event) => {
        setKeyword(event.target.value)
    }

    const handlePriority = (event) => {
        setPriority(event.target.value)
    }

    return(
        <Aux>
            <Grid container>
                <Grid item sm={3}>
                    <FormControl variant="outlined" style={{ width: "85%"}} size="small">
                            <InputLabel id="select-priority">Sort By</InputLabel>
                            <Select
                                labelId="select-priority"
                                label="Priority"
                                value={priority}
                                onChange={ handlePriority }
                            >
                                <MenuItem value="none">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Low">Priority</MenuItem>
                                <MenuItem value="Medium">Created On</MenuItem>
                                <MenuItem value="High">Due On</MenuItem>
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={9}>
                    <TextField
                        size="small"
                        value={keyword}
                        onChange={handleKeyword}               
                        label="Search Task"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Aux>
    )
}

export default SearchControls