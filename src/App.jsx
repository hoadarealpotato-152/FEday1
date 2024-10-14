import { useState, useEffect } from 'react';
import './App.css'
import UserCard from './components/UserCard/UserCard'
import axios from 'axios';
// import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios.get('https://randomuser.me/api/?results=10')
  //     .then((response) => {
  //       setUsers(response.data.results);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setLoading(false);
  //     });
  // }, []);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    axios.get('https://randomuser.me/api/?results=10')
      .then((response) => {
        setUsers(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    // fetchUsers();
    const storedUsers=getStoredUsers();
    if(storedUsers.length > 0){
      setUsers(storedUsers);
      setLoading(false);
    } else {
      axios.get('https://randomuser.me/api/?results=10')
      .then(response => {
        const newUsers=response.data.results;
        setUsers(newUsers);
        saveUsersToStorage(newUsers);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      })
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(users);

  return (
    <div className="app">
      <h1>User Cards</h1>
      <button className="reload-btn" onClick={fetchUsers}>↻</button>
      <div className="cards-container">
        {users.map((user) => (
          <UserCard key={user.login.uuid} user={user} />
        ))}
      </div>
    </div>
  )
}

export default App

const getStoredUsers = () => {
  const storedUsers=localStorage.getItem('users');
  return storedUsers ? JSON.parse(storedUsers) : [];
}

const saveUsersToStorage = (users) => {
  localStorage.setItem('users',JSON.stringify(users));
}

const updateUsers = (updateUsers) => {
  setUsers(updateUsers);
  saveUsersToStorage(updateUsers);
}