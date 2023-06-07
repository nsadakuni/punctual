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
  const [chimeTime, setChimeTime] = useState(60000);
  const [status, setStatus] = useState(false)

  let queue = useRef([]);
  let chime = new Audio('chime.mp3')

  useEffect(() => helpers.getAll(setMeetings), [])

  const goBtn = () => {
    setStatus(true)
    let now = Date.now();
    let opened = [];
    for (let i = 0; i < meetings.length; i++) {
      if (!meetings[i].past) {
        ((i) => {
          queue.current.push(setTimeout(() => {
            chime.play()
          }, meetings[i].startTime - now - tminus - 60000));
        })(i);

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
    setStatus(false)
    if (!queue.current.length) {
      return;
    }
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
        <h1 className={`flex self-center justify-self-start font-bold text-6xl ${status && 'animate-pulse'}`}>
          <img className='self-center object-scale-down h-16 w-16 animate-pulse' src='logo.png'/>
          punctual.
        </h1>
        <button className='flex items-center justify-self-end self-center border rounded w-auto h-8 p-2'>Sign in</button>
      </nav>
      <div className='grid grid-cols-2'>
        <div className='flex-col m-2'>
          <button disabled={status} className={`text-white font-bold py-2 px-4 rounded mr-2 ${status ? 'bg-blue-200': 'bg-blue-500 hover:bg-blue-700'}`} onClick={() => document.getElementById('addDialog').showModal()}>Add a new meeting</button>
          <button disabled={status} className={`w-1/6 text-white font-bold py-2 px-4 rounded mr-2 ${status ? 'bg-green-200' : 'bg-green-500 hover:bg-green-700'}`} onClick={goBtn}>Go</button>
          <button disabled={!status} className={`w-1/6 text-white font-bold py-2 px-4 rounded ${status ? 'bg-red-500 hover:bg-red-700' : 'bg-red-200'}`} onClick={stopBtn}>Stop</button>
          <div className='pt-1 pb-2'>
            <input className='text-gray-700 border-2 text-sm rounded p-2 w-1/3' type='number' min='0' placeholder='#minutes before auto-join' onChange={(e) => setTminus(e.target.value*60000)}/>
            <input className='text-gray-700 border-2 text-sm rounded p-2 w-1/3' type='number' min='0' placeholder='#minutes before notification' onChange={(e) => setChimeTime(e.target.value*60000)}/>
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