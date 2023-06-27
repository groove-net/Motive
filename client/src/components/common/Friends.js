import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Friends(props) {
  const { id } = props;
  const [friendsReceived, setFriendsReceived] = useState([]);
  const [friendsSent, setFriendsSent] = useState([]);
  const totalFriends = friendsReceived.concat(friendsSent);
  function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const navigate = useNavigate();

  const navigateToProfile = (friend) => {
    navigate(`/dashboard/${friend}/profile`);
  };

  useEffect(() => {
    Axios.get(`http://localhost:3001/friendsReceived/get/${id}`).then(
      (response) => {
        setFriendsReceived(response.data);
      }
    );

    Axios.get(`http://localhost:3001/friendsSent/get/${id}`).then(
      (response) => {
        setFriendsSent(response.data);
      }
    );
  });

  return (
    <div>
      <h2>
        <b>Friends List</b>
      </h2>
      <Table style={{ width: '800px' }} striped bordered hover>
        <tbody>
          {removeDuplicates(totalFriends).map((friend) => (
            <tr>
              <th scope='row'>{friend}</th>
              <td>
                <Button
                  onClick={() => {
                    navigateToProfile(friend);
                  }}
                  variant='primary'
                >
                  View Profile
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Friends;
