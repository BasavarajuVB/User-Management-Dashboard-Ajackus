import React, { Component } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaTrash } from 'react-icons/fa'; 
import { toast } from 'react-toastify';
import UserForm from './UserForm';
import EachUser from './EachUser';
import '../styles/UserList.css';
import ErrorBoundary from './ErrorBoundary'; 
import Pagination from './Pagination'; 
const departments = [
  "Human Resources", "Sales", "Marketing", "Finance", "Engineering", "IT Support", 
  "Customer Service", "Legal", "Operations", "Research and Development (R&D)", 
  "Product Management", "Quality Assurance", "Purchasing", "Administration", "Business Development"
];

const ITEMS_PER_PAGE = 5;

class UserList extends Component {
  state = {
    users: [],
    searchTerm: '',
    showModal: false,
    editingUser: null,
    currentPage: 1,
    isFetching: false,  
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    this.setState({ isFetching: true });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      const usersWithDepartment = data.map(user => ({
        ...user,
        department: departments[Math.floor(Math.random() * departments.length)],
      }));

      const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
      this.setState({ users: [...usersWithDepartment, ...localUsers], isFetching: false });
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users. Please try again later.', {
        icon: <FaExclamationCircle />,
      });
      this.setState({ isFetching: false });
    }
  };

  handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = this.state.users.filter(user => user.id !== id);
      const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
      const updatedLocalUsers = localUsers.filter(user => user.id !== id);
      localStorage.setItem('localUsers', JSON.stringify(updatedLocalUsers));

      this.setState({ users: updatedUsers });
      toast.success('User deleted successfully', {
        icon: <FaTrash />,
      });
    }
  };

  handleSaveUser = (user) => {
    if (this.state.editingUser) {
      const updatedUsers = this.state.users.map(u => (u.id === user.id ? user : u));
      this.setState({ users: updatedUsers });

      const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
      const updatedLocalUsers = localUsers.map(u => (u.id === user.id ? user : u));
      localStorage.setItem('localUsers', JSON.stringify(updatedLocalUsers));

      toast.success('User updated successfully', {
        icon: <FaCheckCircle />,
      });
    } else {
      const newUser = { ...user, id: this.state.users.length + 1 };
      const updatedUsers = [...this.state.users, newUser];
      this.setState({ users: updatedUsers });

      const localUsers = JSON.parse(localStorage.getItem('localUsers')) || [];
      localUsers.push(newUser);
      localStorage.setItem('localUsers', JSON.stringify(localUsers));

      toast.success('User added successfully', {
        icon: <FaCheckCircle />,
      });
    }

    this.setState({ showModal: false, editingUser: null });
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value, currentPage: 1 });
  };

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    const { users, searchTerm, showModal, editingUser, currentPage, isFetching } = this.state;

    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
      <div className="user-management">
        <ErrorBoundary onRetry={this.fetchUsers}>
          {isFetching ? (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading, please wait...</p>
                </div>
                         ) : (
            <>
              {showModal && (
                <UserForm
                  user={editingUser}
                  onClose={() => this.setState({ showModal: false, editingUser: null })}
                  onSave={this.handleSaveUser}
                  departments={departments}
                />
              )}

              <div className="header">
                <h1>User Management</h1>
                <button onClick={() => this.setState({ showModal: true })}>Add User</button>
              </div>

              <input
                type="text"
                className="search-input"
                placeholder="Search users..."
                value={searchTerm}
                onChange={this.handleSearchChange}
              />
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Firstname</th>
                    <th>Email</th>
                    <th>Lastname</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
               
                  {currentUsers.map((user) => (
                    <EachUser
                      key={user.id}
                      user={user}
                      onEdit={() => {
                        this.setState({ editingUser: user, showModal: true });
                      }}
                      onDelete={() => this.handleDelete(user.id)}
                    />
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && searchTerm && (
                <div className="error-message">
                  <FaExclamationCircle size={80} className="error-icon" />
                  No users found matching "{searchTerm}"
                </div>
              )}
              
              <Pagination 
                totalItems={filteredUsers.length} 
                itemsPerPage={ITEMS_PER_PAGE} 
                currentPage={currentPage} 
                paginate={this.paginate} 
              />
            </>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default UserList;
