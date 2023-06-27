import React from 'react';
import SideBar from './common/SideBar';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  const params = useParams();
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <div style={{ flex: '1' }}>
        <SideBar id={params.id} />
      </div>
      <div
        style={{
          flex: '4.6',
          overflow: 'scroll initial',
          padding: '60px',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
