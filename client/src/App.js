import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/landing';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import TaskLists from './components/TaskList';
import TaskListsAdd from './components/common/TaskListAdd';
import TaskListUpdate from './components/common/TaskListUpdate';
import TaskListDelete from './components/common/TaskListDelete';
import Notes from './components/Notes';
import NotesAdd from './components/common/NotesAdd';
import NotesView from './components/common/NotesView';
import Community from './components/Community';
import Profile from './components/Profile';

function App() {
  return (
    <main className='contianer'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard/:id' element={<Dashboard />}>
          <Route
            path={''}
            element={<h1>This page is still under construction... 🔨</h1>}
          />
          <Route path={'community'} element={<Community />} />
          <Route path={'profile'} element={<Profile />} />
          <Route path={'tasklist'} element={<TaskLists />} />
          <Route path={'tasklist/add'} element={<TaskListsAdd />} />
          <Route
            path={'tasklist/update/:task/:description/:category/:status'}
            element={<TaskListUpdate />}
          />
          <Route path={'tasklist/delete/:task'} element={<TaskListDelete />} />
          <Route path={'notes'} element={<Notes />} />
          <Route path={'notes/add'} element={<NotesAdd />} />
          <Route path={'notes/view/:title/:content'} element={<NotesView />} />
        </Route>
        <Route path='/' element={<Landing />} />
      </Routes>
    </main>
  );
}

export default App;
