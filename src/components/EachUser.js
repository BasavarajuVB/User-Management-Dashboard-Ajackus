import React from 'react';
import "../styles/EachUser.css";

const EachUser = ({ user, onEdit, onDelete }) => {
  return (
    <tr className="user-item ">
      <td className="cell-id bg-primary" id='userId'>{user.id}</td>
      <td className="cell-text">{user.name}</td>
      <td className="cell-email">{user.email}</td>
      <td className="cell-text">{user.username}</td>
      <td className="cell-text department">{user.department}</td>
      <td className="action-buttons">
        <button id="edit" onClick={onEdit}>Edit</button>
        <button id="delete" onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default EachUser;