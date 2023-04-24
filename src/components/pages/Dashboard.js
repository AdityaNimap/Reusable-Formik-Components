import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const token = localStorage.getItem('token')

  const getUsers = () => {
    axios
      .get(`http://localhost:8080/users`)
      .then((resp) => {
        setUsers([...resp.data])
      })
  }

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8080/users/${id}`)
      getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [token])
  return (
    <div>
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile no.</TableCell>
                <TableCell>Terms</TableCell>
                <TableCell colSpan={2} align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                users.map((user, index) => (

                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobNo}</TableCell>
                    <TableCell>{user.terms}</TableCell>
                    <TableCell sx={{ padding: '0' }}><Button><i className="fa-solid fa-pen-to-square fa-lg"></i></Button></TableCell>
                    <TableCell sx={{ padding: '0' }}><Button onClick={()=>deleteUser(user.id)}><i className="fa-solid fa-trash fa-lg"></i></Button></TableCell>
                  </TableRow>
                )
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default Dashboard