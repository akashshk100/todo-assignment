import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/AddCircleRounded'
import Aux from '../../HOC/Auxilliary/Auxilliary'

const Layout = (props) => {

    return(
        <Aux>
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: "1"}} >
                    Todo App
                </Typography>
                <IconButton onClick={props.openAddNoteModal}>
                    <AddIcon color="primary" />
                </IconButton>
            </Toolbar>
            <main>
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout