import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

function SideBar(props) {
  const { id } = props;
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [totalNotes, setTotalNotes] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/pending/get/${id}`).then((response) => {
      setPendingRequests(response.data);
    });
  });

  useEffect(() => {
    Axios.get(`http://localhost:3001/notes/get/${id}`).then((response) => {
      setTotalNotes(response.data);
    });
  });

  useEffect(() => {
    Axios.get(`http://localhost:3001/pendingTasks/get/${id}`).then(
      (response) => {
        setPendingTasks(response.data);
      }
    );
  });

  return (
    <div
      style={{
        height: '100vh',
        overflow: 'scroll initial',
        position: 'fixed',
      }}
    >
      <CDBSidebar textColor='#fff' backgroundColor='#333'>
        <CDBSidebarHeader>
          <span style={{ color: 'inherit' }}>Welcome, {id}</span>
        </CDBSidebarHeader>

        <CDBSidebarContent className='sidebar-content'>
          <CDBSidebarMenu>
            <NavLink
              exact
              to={`/dashboard/${id}`}
              activeClassName='activeClicked'
            >
              <CDBSidebarMenuItem icon='columns'>Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to={`/dashboard/${id}/profile`}
              activeClassName='activeClicked'
            >
              <CDBSidebarMenuItem icon='user'>Profile page</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to={`/dashboard/${id}/community`}
              activeClassName='activeClicked'
            >
              <CDBSidebarMenuItem icon='users'>
                Community{' '}
                <Badge pill bg={'primary'}>
                  {pendingRequests.length}
                </Badge>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to={`/dashboard/${id}/tasklist`}
              activeClassName='activeClicked'
            >
              <CDBSidebarMenuItem icon='list'>
                TaskLists{' '}
                <Badge pill bg={'primary'}>
                  {pendingTasks.length}
                </Badge>
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to={`/dashboard/${id}/notes`}
              activeClassName='activeClicked'
            >
              <CDBSidebarMenuItem icon='pen'>
                Notes{' '}
                <Badge pill bg={'primary'}>
                  {totalNotes.length}
                </Badge>
              </CDBSidebarMenuItem>
            </NavLink>
            <hr />
            <NavLink exact to={`/login`} activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='power-off'>Log out</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <img
            style={{ height: '50px' }}
            src={require('../../motive-logo.jpg')}
            alt='logo'
          />
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Motive Labs, Inc.
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

// function SideBar(props) {
//   const { id } = props;
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to={`/dashboard/${id}/community`}>Community</Link>
//         </li>
//         <li>
//           <Link to={`/dashboard/${id}/tasklist`}>Tasklist</Link>
//         </li>
//         <li>
//           <Link to={`/dashboard/${id}/notes`}>Notes</Link>
//         </li>
//         <li>
//           <Link to={`/dashboard/${id}/assignments`}>Assignments</Link>
//         </li>
//         <li>
//           <Link to={`/dashboard/${id}/meetings`}>Meetings</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

export default SideBar;
