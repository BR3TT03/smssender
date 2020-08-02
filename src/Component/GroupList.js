import React from 'react'
import styled from 'styled-components';
import { Typography, Divider, IconButton, Button, CircularProgress } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { connect } from 'react-redux';
import { loadGroups, deleteGroup } from '../Store/Actions/groupsAction'
import TableLoader from '../Component/TableLoader'
import CreateGroupRoute from './CreateGroupRoute'
import { Link, useHistory } from 'react-router-dom'

const GroupList = ({ loadGroups, loader, groups, deleteGroup, deletingGroupLoader }) => {

    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const openModalHalder = () => {
        setOpen(true)
    }

    const closeModalHandler = () => {
        setOpen(false)
        history.push('/manage-groups');
    }

    const deleteGroupHandler = groupId => {
        deleteGroup(groupId)
    }

    React.useEffect(() => {
        loadGroups();
    },[loadGroups])

    return (
        <Container>
            { open ? <CreateGroupRoute closeModalHandler={closeModalHandler}/> : null }
            <Header>
                    <Typography variant='subtitle2' color='textPrimary' style={{ fontSize : '16px' }}>
                            Group List
                    </Typography>
                    <Link to={`${history.location.pathname}/create-group`} 
                          style={{ textDecoration : 'none' }} onClick={openModalHalder}>
                        <Button color='primary'
                                size='small'
                                variant='contained'
                                disableElevation
                                startIcon={<OpenInNewIcon fontSize='small'/>}
                                >
                            Create Group      
                        </Button>
                    </Link>
                 
            </Header>
            <Divider />
            <TableContainer style={{ padding : '2rem 3rem', boxSizing : 'border-box' }}>
                { !loader ?
                      groups.length !== 0 ?  
                         <Table size="small">
                            <TableHead>
                                    <TableRow>
                                        <TableCell>S.N</TableCell>
                                        <TableCell align="center">Group name</TableCell>
                                        <TableCell align="center">Edit</TableCell>
                                        <TableCell align="right">Delete</TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                    {
                                        groups.map((group, index) =>
                                            <TableRow key={group.groupId}>
                                                <TableCell>{++index}.</TableCell>
                                                <TableCell align="center">{group.groupName}</TableCell>
                                                <TableCell align="center">
                                                   <Link to={{
                                                               pathname : `${history.location.pathname}/edit-group`,
                                                               state : { groupId : group.groupId, groupName : group.groupName } 
                                                            }}
                                                            onClick={openModalHalder}
                                                         >
                                                        <IconButton size='small'>
                                                                    <EditIcon fontSize='small'/>
                                                        </IconButton>
                                                   </Link> 
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButton size='small' onClick={deleteGroupHandler.bind(null, group.groupId)}>
                                                          {  
                                                            deletingGroupLoader 
                                                                ?
                                                                <CircularProgress  size={20}/> 
                                                                :
                                                                <RemoveCircleOutlineIcon fontSize='small' color='secondary'/>
                                                          }
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                            
                            </TableBody>
                        </Table>
                :   
                 <div>
                     <Typography variant='subtitle2' color='textSecondary' align='center' component='div'>
                            You don't have any groups yet.
                     </Typography>
                 </div> 
                :
                <TableLoader />
                }
            </TableContainer>
        </Container>
    )
}

const mapStateToProps = state => {
     return {
         loader : state.groupsReducer.groupsLoader,
         groups : state.groupsReducer.groups,
         deletingGroupLoader : state.groupsReducer.deletingGroupLoader
     }
}

const mapDispatchToProps = dispatch => {
    return {
        loadGroups : () => dispatch(loadGroups()),
        deleteGroup : groupId => dispatch(deleteGroup(groupId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList)

const Container = styled.div`
    margin-bottom : 20px;
    border-radius : 10px;
    background : #fff;
    box-sizing : border-box;
    box-shadow: rgba(53, 64, 82, 0.05) 1px 0px 14px 0px;
`
const Header = styled.div`
   height : 60px;
   padding : 0px 20px;
   display : flex;
    box-sizing : border-box;
   align-items : center;
   justify-content : space-between;
   border-bottom : 1px solid rgba(0, 0, 0, 0.12);
`
