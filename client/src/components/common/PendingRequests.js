import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Axios from 'axios';

function PendingRequests(props) {
  const { id } = props;
  const [pendingList, setPendingList] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/pending/get/${id}`).then((response) => {
      setPendingList(response.data);
    });
  });

  const acceptRequest = (sender) => {
    Axios.put(`http://localhost:3001/pending/accept/${id}`, {
      sender: sender,
    });
  };

  const rejectRequest = (sender) => {
    Axios.put(`http://localhost:3001/pending/reject/${id}`, {
      sender: sender,
    });
  };

  if (pendingList.length === 0) {
    return <div></div>;
  } else {
    return (
      <div>
        <hr />
        <h4>Pending request:</h4>
        <Table style={{ width: '400px' }} className='table'>
          <tbody>
            {pendingList.map((pending) => (
              <tr>
                <th scope='row'>{pending.sender}</th>
                <td>
                  <Button
                    onClick={() => {
                      acceptRequest(pending.sender);
                    }}
                    variant='primary'
                  >
                    Accept
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      rejectRequest(pending.sender);
                    }}
                    variant='danger'
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PendingRequests;
