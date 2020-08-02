import React from 'react'
import { Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';

function TableLoader() {
    return (
            <Table size="small">
                <TableHead>
                        <TableRow>
                            <TableCell><Skeleton variant="text" width={40}/></TableCell>
                            <TableCell align="center"><Skeleton variant="text" /></TableCell>
                            <TableCell align="center"><Skeleton variant="text" /></TableCell>
                            <TableCell align="right"><Skeleton variant="text" /></TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow>
                            <TableCell><Skeleton variant="text" width={20}/></TableCell>
                            <TableCell align="center"><Skeleton variant="text" width={200}/></TableCell>
                            <TableCell align="center">
                                <Skeleton variant="text" width={40}/>
                            </TableCell>
                            <TableCell align="right">
                                <Skeleton variant="text" width={40}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Skeleton variant="text" width={20}/></TableCell>
                            <TableCell align="center"><Skeleton variant="text" width={200}/></TableCell>
                            <TableCell align="center">
                                <Skeleton variant="text" width={40}/>
                            </TableCell>
                            <TableCell align="right">
                                <Skeleton variant="text" width={40}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Skeleton variant="text" width={20}/></TableCell>
                            <TableCell align="center"><Skeleton variant="text" width={200}/></TableCell>
                            <TableCell align="center">
                                <Skeleton variant="text" width={40}/>
                            </TableCell>
                            <TableCell align="right">
                                <Skeleton variant="text" width={40}/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Skeleton variant="text" width={20}/></TableCell>
                            <TableCell align="center"><Skeleton variant="text" width={200}/></TableCell>
                            <TableCell align="center">
                                <Skeleton variant="text" width={40}/>
                            </TableCell>
                            <TableCell align="right">
                                <Skeleton variant="text" width={40}/>
                            </TableCell>
                        </TableRow>
                </TableBody>
            </Table>
    )
}

export default TableLoader
