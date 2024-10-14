import { useState } from 'react'
import PropTypes from 'prop-types';
import './UserCard.css';

function UserCard({ user }) {
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const formatDOB = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };

  const genderIcon = user.gender === 'male' ? '♂️' : '♀️';


  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-inner">
        <div className="card-front">
          <img src={user.picture.large} alt="Avatar" className="avatar" />
          <h3 className="name">{`${user.name.title} ${user.name.first} ${user.name.last}`}</h3>
          <p className="age-gender">
            DOB: {formatDOB(user.dob.date)} | {genderIcon}
          </p>
        </div>
        <div className="card-back">
          <h3 className="details-header">Information Detail</h3>
          <div className="info-detail">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Cellphone:</strong> {user.cell}</p>
            <p><strong>Location:</strong> {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`}</p>
            <p><strong>Nation:</strong> {user.nat}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    gender: PropTypes.string.isRequired,
    name: PropTypes.shape({
      title: PropTypes.string.isRequired,
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      street: PropTypes.shape({
        number: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      postcode: PropTypes.number.isRequired,
      coordinates: PropTypes.shape({
        latitude: PropTypes.string.isRequired,
        longitude: PropTypes.string.isRequired,
      }).isRequired,
      timezone: PropTypes.shape({
        offset: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    email: PropTypes.string.isRequired,
    login: PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    dob: PropTypes.shape({
      date: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
    }).isRequired,
    phone: PropTypes.string.isRequired,
    cell: PropTypes.string.isRequired,
    picture: PropTypes.shape({
      large: PropTypes.string.isRequired,
      medium: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    }).isRequired,
    nat: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserCard;
