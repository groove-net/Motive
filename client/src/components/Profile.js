import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function Profile() {
  const params = useParams();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/profile/get/${params.id}`).then(
      (response) => {
        setProfile(response.data);
      }
    );
  });

  return (
    <div>
      <center>
        <img
          style={{ height: '450px' }}
          src={require('../blank-profile.png')}
          alt='profilepic'
        />
        <h1>
          {profile.firstname} {profile.lastname}
        </h1>
      </center>
      <hr />
      <h3>
        <b>Username: </b>
        {profile.id}
      </h3>
      <h3>
        <b>Account: </b>
        {profile.accountType}
      </h3>
      <h3>
        <b>About Me: </b>
        <u>{profile.about}</u>
      </h3>
    </div>
  );
}

export default Profile;
