import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import helpers from './helpers.jsx'
import Add from './Add.jsx';
import List from './List.jsx';
import './assets/styles.css';


const App = () => {
  const [meetings, setMeetings] = useState([]);
  const [tminus, setTminus] = useState(60000);
  let queue = useRef([]);

  useEffect(() => helpers.getAll(setMeetings), [])

  const goBtn = () => {
    let now = Date.now();
    let opened = [];
    for (let i = 0; i < meetings.length; i++) {
      ((i) => {
        queue.current.push(setTimeout(() => {
          axios.put('/meetings', meetings[i])
            .then(() => helpers.getAll(setMeetings))
            .catch(err => console.error('Could not get meetings', err))
          opened[i] = (window.open(meetings[i].url));
        }, meetings[i].time - now - tminus));
      })(i);

      ((i) => {
        queue.current.push(setTimeout(() => {
          opened[i].close();
        }, meetings[i].time - now - tminus + 2000));
      })(i);
    }
  }

  const stopBtn = () => {
    console.log('Stopping')
    for (let i = 0; i < queue.current.length; i++) {
      clearTimeout(queue.current[i]);
    }
  }

  const deleteBtn = (meeting) => {
    axios.delete('/meetings', {data: {meeting}})
      .then(() => helpers.getAll(setMeetings))
      .catch(err => console.error('Could not delete meeting:', err))
  }

  return (
    <div id='app'>
      <h1>Punctual</h1>
      <List meetings={meetings} deleteBtn={deleteBtn}/>
      <Add setMeetings={setMeetings}/>
      <input type='number' min='0' placeholder='Number of minutes before joining' onChange={(e) => setTminus(e.target.value*60000)}/>
      <button onClick={() => document.getElementById('addDialog').showModal()}>Add a new meeting</button>
      <button onClick={goBtn}>Go</button>
      <button onClick={stopBtn}>Stop</button>
    </div>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);