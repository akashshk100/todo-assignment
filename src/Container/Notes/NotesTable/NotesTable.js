import React, { useState } from 'react';
import TablePaginationActions from '../TablePaginationActions/TablePaginationActions'
import Aux from '../../../HOC/Auxilliary/Auxilliary'
import AddNoteModal from '../../AddNoteModal/AddNoteModal'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import TableHead from '@material-ui/core/TableHead';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Toolbar from '@material-ui/core/Toolbar';



const NotesTable= (props) => {

  let [addNoteModal, setAddNoteModal] = useState({
    clicked: false,
    id: null,
    viewOnly: null
  })

  let [order, setOrder] = useState([true, true, true])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.notes.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    // console.log(id)
    setAddNoteModal({
      clicked: true,
      id: id,
      viewOnly: false
    })
  }

  const handleCellClick = (id) => {
    setAddNoteModal({
      clicked: true,
      id: id,
      viewOnly: true
    })
  }

  const handleOrderBySummary = () => {
    props.sortBySummary(order[0])
    let tempOrder = order
    tempOrder[0] = !tempOrder[0]
    setOrder(tempOrder)
  }

  const handleOrderByCreatedAt = () => {
    props.sortByCreatedAt(order[1])
    let tempOrder = order
    tempOrder[1] = !tempOrder[1]
    setOrder(tempOrder)
  }

  const handleOrderByDueDate = () => {
    props.sortByDueDate(order[2])
    let tempOrder = order
    tempOrder[2] = !tempOrder[2]
    setOrder(tempOrder)
  }


  let modalContent = null 
  if(addNoteModal.clicked){
    // console.log(props.notes)
    let tempIndex = -1
    for (let index = 0; index < props.notes.length; index++) {
      if(props.notes[index].id === addNoteModal.id){
        tempIndex = index
        break
      }
    }
    modalContent = (
      <AddNoteModal 
        id = {addNoteModal.id}
        open={true} 
        closeAddNoteModal={ () => { setAddNoteModal({clicked: false, id: null, viewOnly: null}) } } 
        disabled={addNoteModal.viewOnly}
        addNote={props.editNote} 
        summary = {props.notes[tempIndex].summary}
        description = {props.notes[tempIndex].description}
        priority = {props.notes[tempIndex].priority}
        dueDate = {props.notes[tempIndex].dueDate}
      />
    ) 
  }else{
    modalContent = null
  }

  return (
    <Aux>
      {modalContent}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Toolbar variant="dense">
                  <Typography variant="subtitle2" style={{ flexGrow: "1" }}>
                  Summary
                  </Typography>
                  <IconButton onClick={ handleOrderBySummary }>
                    {order[0] ? (<ArrowUpwardIcon />) : (<ArrowDownwardIcon />)}
                  </IconButton>
                </Toolbar>
              </TableCell>
            <TableCell >
              <Toolbar variant="dense">
                <Typography variant="subtitle2" style={{ flexGrow: "1" }}>
                  Priority
                </Typography>
              </Toolbar>
            </TableCell>
            <TableCell >
              <Toolbar variant="dense">
                <Typography variant="subtitle2" style={{ flexGrow: "1" }}>
                  Created At
                </Typography>
                <IconButton onClick={ handleOrderByCreatedAt}>
                  {order[1] ? (<ArrowUpwardIcon />) : (<ArrowDownwardIcon />)}
                </IconButton>
              </Toolbar>
            </TableCell>
            <TableCell >
              <Toolbar variant="dense" >
                <Typography variant="subtitle2" style={{ flexGrow: "1" }}>
                  Due By
                </Typography>
                <IconButton onClick={ handleOrderByDueDate }>
                  {order[2] ? (<ArrowUpwardIcon />) : (<ArrowDownwardIcon />)}
                </IconButton>
              </Toolbar>
            </TableCell>
            <TableCell >
              <Toolbar variant="dense">
                <Typography variant="subtitle2" style={{ flexGrow: "1" }}>
                  Actions
                </Typography>
              </Toolbar>
            </TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
          {(rowsPerPage > 0
          ? props.notes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : props.notes
          ).map((row, index) => (
          <TableRow key={index}>
            <TableCell onClick={ () => {handleCellClick(row.id)}}>
              { (!row.currentState) ? (
                <del> {row.summary} </del>
              ) : row.summary }
            </TableCell>
            <TableCell onClick={ () => {handleCellClick(row.id)}}>
              { (!row.currentState) ? (
                <del> {row.priority} </del>
              ) : row.priority }
            </TableCell>
            <TableCell onClick={ () => {handleCellClick(row.id)}}>
              { (!row.currentState) ? (
                <del> {row.createdAt.getDate()+"-"+row.createdAt.getMonth()+"-"+row.createdAt.getFullYear() } </del>
              ) : row.createdAt.getDate()+"-"+row.createdAt.getMonth()+"-"+row.createdAt.getFullYear() }
            </TableCell>
            <TableCell onClick={ () => {handleCellClick(row.id)}}>
              { (!row.currentState) ? (
                <del> {row.dueDate.getDate()+"-"+row.dueDate.getMonth()+"-"+row.createdAt.getFullYear() } </del>
              ) : row.dueDate.getDate()+"-"+row.dueDate.getMonth()+"-"+row.createdAt.getFullYear() }
            </TableCell>
            <TableCell >
              <IconButton color="primary" size="small" onClick={() => {handleEdit(row.id)}}>
                <EditIcon />
              </IconButton>
              <Button 
                variant="contained" 
                size="small" 
                onClick={ () => {props.changeState(row.id)} } 
                style={{ margin: "0px 10px" ,backgroundColor: (row.currentState)?"#4AC571":"#428CB2" }}
              >
                <Typography variant="subtitle2" style={{color: "white"}}>
                  { (row.currentState)?"Done":"Re-Open" }
                </Typography>
              </Button>
              <IconButton color="secondary" size="small" onClick={ () => {props.removeNote(row.id)} }>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={props.notes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Aux>
  );
}

export default NotesTable