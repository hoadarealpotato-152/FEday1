import { useState } from "react";
import UserCard from "../UserCard/UserCard";
import "./UserManagement.css";

function UserManagement({ users, setUsers }) {
  const [newUser, setNewUser] = useState({
    name: { first: "", last: "" },
    dob: { date: "" },
  });

  const addUser = () => {
    const updatedUsers = [...users,newUser];
    setUsers(updatedUsers);
    setNewUser({
        name: { first: "", last: "" },
        dob: { date: "" },
    })
  };

  const updateUser = (index, updateUser) => {
    const updatedUsers=users.map((user,i) => (i === index ? updateUser : user));
    setUsers(updatedUsers);
  }

  const deleteUser = (index) => {
    const updatedUsers=users.filter((_,i) => i !== index);
    setUsers(updatedUsers);
  }

  return (
    <div>
        <div className="add-user-form">
            <h2>Add A New User</h2>
            <input type="text" placeholder="First Name" value={newUser.name.first} 
            onChange={(e) => setNewUser({...newUser,name:{...newUser.name, first:e.target.value}})}/>
            <input type="text" placeholder="Last Name" value={newUser.name.last} 
            onChange={(e) => setNewUser({...newUser,name:{...newUser.name, last:e.target.value}})}/>
            <input type="date" value={newUser.dob}
            onChange={(e) => setNewUser({...newUser,dob:e.target.valueAsDate})}/>

            <button onClick={addUser}>Add User</button>
        
        </div>
    </div>
  )
}
