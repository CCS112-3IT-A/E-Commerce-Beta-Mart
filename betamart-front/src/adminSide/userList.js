import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import AddUser from './addUser';
import UpdateUser from './updateUser';
import DeleteUser from './removeUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
 
   useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/userList');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    setSelectedUser(null);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <Container>
      <AddUser onAddUser={handleAddUser} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td className="d-flex justify-content-center align-items-center px-3">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="mr-2 px-3"
                  onClick={() => handleEditUser(user)}
                >
                  <FaEdit />
                </Button>
                <DeleteUser user={user} onDelete={handleDeleteUser} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UpdateUser
        user={selectedUser}
        onUpdate={handleUpdateUser}
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default UserList;