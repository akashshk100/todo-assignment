import React, {useEffect ,useState} from 'react'
import Aux from '../../HOC/Auxilliary/Auxilliary'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'

const SearchControls = (props) => {

    let [sortBy, setSortBy] = useState("none")
    let [keyword, setKeyword] = useState("")

    useEffect( () => {
        setSortBy(props.sortedBy)
    }, [props.sortedBy])

    const handleKeyword = (event) => {
        props.handleSearch(event.target.value)
        setKeyword(event.target.value)
    }

    const handleSortby = (event) => {
        setSortBy(event.target.value)
        props.handleSortby(event.target.value)
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
                                value={sortBy}
                                onChange={ handleSortby }
                            >
                                <MenuItem value="none">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="priority">Priority</MenuItem>
                                <MenuItem value="createdOn" disabled>Created On</MenuItem>
                                <MenuItem value="dueOn" disabled>Due On</MenuItem>
                            </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={9}>
                    <TextField
                        size="small"
                        value={keyword}
                        onChange={handleKeyword}               
                        label="Search in All Task"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Aux>
    )
}

export default SearchControls