import './index.css';
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import helpers from './helpers.jsx'
import Add from './Add.jsx';
import List from './List.jsx';
import Clock from './Clock.jsx';

const App = () => {
  const [meetings, setMeetings] = useState([]);
  const [tminus, setTminus] = useState(60000);
  const [status, setStatus] = useState(false)

  let queue = useRef([]);

  useEffect(() => helpers.getAll(setMeetings), [])

  const goBtn = () => {
    console.log('go')
    setStatus(true)
    let now = Date.now();
    let opened = [];
    for (let i = 0; i < meetings.length; i++) {
      if (!meetings[i].past) {
        ((i) => {
          queue.current.push(setTimeout(() => {
            opened[i] = (window.open(meetings[i].url));
            helpers.put(meetings[i], setMeetings)
          }, meetings[i].startTime - now - tminus));
        })(i);

        ((i) => {
          queue.current.push(setTimeout(() => {
            opened[i].close();
          }, meetings[i].startTime - now - tminus + 5000));
        })(i);
      }
    }
  }

  const stopBtn = () => {

    console.log('stop')
    setStatus(false)
    if (!queue.current.length) {
      console.log('Nothing in queue.')
      return;
    }
    console.log('Stopping', queue.current)
    for (let i = 0; i < queue.current.length; i++) {
      clearTimeout(queue.current[i]);
    }
    queue.current = [];
  }

  const deleteBtn = (meeting) => {
    axios
      .delete('/meetings', {data: {meeting}})
      .then(() => helpers.getAll(setMeetings))
      .catch(err => console.error('Could not delete meeting:', err))
  }

  return (
    <div className='bg-gray-100'>
      <nav className="grid grid-cols-2 bg-gray-800 text-white px-4 lg:px-6 py-2.5">
        <h1 className='font-bold text-6xl'>punctual.</h1>
        <button className='flex items-center justify-self-end self-center border rounded w-auto h-8 p-2'>Sign in</button>
      </nav>
      <div className='grid grid-cols-2'>
        <div className='flex-col m-2'>
          <button disabled={status} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={() => document.getElementById('addDialog').showModal()}>Add a new meeting</button>
          <button disabled={status} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={goBtn}>Go</button>
          <button disabled={!status} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'onClick={stopBtn}>Stop</button>
          <div className='pt-1 pb-2'>
            <input className='text-gray-700 border-2 text-sm rounded p-2 w-1/2' type='number' min='0' placeholder='Set number of minutes before auto-join' onChange={(e) => setTminus(e.target.value*60000)}/>
          </div>
          <List meetings={meetings} deleteBtn={deleteBtn}/>
          <Add setMeetings={setMeetings}/>
        </div>
        <div className='justify-self-end pr-10 pt-10 fixed'>
          <Clock meetings={meetings} setMeetings={setMeetings}/>
        </div>
      </div>
      <footer className="bg-gray-900">
      <div className="w-full p-10 mt-10"></div>
      </footer>
    </div>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);