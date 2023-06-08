import './index.css';
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import helpers from './helpers.jsx'
import Add from './Add.jsx';
import List from './List.jsx';
import Clock from './Clock.jsx';
import Todo from './Todo.jsx';

const App = () => {
  const [meetings, setMeetings] = useState([]);
  const [tminus, setTminus] = useState(60000);
  const [chimeTime, setChimeTime] = useState(120000);
  const [status, setStatus] = useState(false)
  const [form, setForm] = useState({});

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
            console.log(meetings[i].url)
            chime.play()
          }, meetings[i].startTime - now  - chimeTime));
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

  return (
    <div className='flex flex-col justify-between bg-gray-100 min-h-screen'>
      <header className="grid grid-cols-2 bg-gray-800 text-white px-4 lg:px-6 py-6">
        <h1 className={`flex self-center justify-self-start font-bold text-6xl ${status && 'animate-pulse'}`}>
          <img className='self-center object-scale-down h-16 w-16' src='logo2.png'/>
          nTime.
        </h1>
        {/* <button className='flex items-center justify-self-start self-center border rounded w-auto h-8 p-2'>Sign in</button> */}
      </header>
      <div className='grid grid-cols-2'>
        <div className='flex-col m-5'>
          <button disabled={status} className={`transition ease-in-out delay-100 drop-shadow-lg text-white font-bold py-2 px-4 rounded-md mr-2 ${status ? 'bg-blue-200': 'bg-blue-500 hover:bg-blue-700'}`} onClick={() => document.getElementById('addDialog').showModal()}>Add a new meeting</button>
          <button disabled={status} className={`transition ease-in-out delay-100 drop-shadow-lg w-1/6 text-white font-bold py-2 px-4 rounded-md mr-2 ${status ? 'bg-green-200' : 'bg-green-500 hover:bg-green-700'}`} onClick={goBtn}>Go</button>
          <button disabled={!status} className={`transition ease-in-out delay-100 drop-shadow-lg w-1/6 text-white font-bold py-2 px-4 rounded-md  ${status ? 'bg-red-500 hover:bg-red-700' : 'bg-red-200'}`} onClick={stopBtn}>Stop</button>
          <div className='grid grid-cols-4 pt-2 pb-2'>
            <div className='flex-col'>
              <input className='text-gray-700 border-2 text-sm rounded-md p-1' type='number' min='0' placeholder='#minutes' onChange={(e) => setTminus(e.target.value*60000)}/>
              <div className='pl-1 text-xs text-gray-500'>Auto-join</div>
            </div>
            <div className='flex-col'>
              <input className='text-gray-700 border-2 text-sm rounded-md p-1' type='number' min='0' placeholder='#minutes' onChange={(e) => setChimeTime(e.target.value*60000)}/>
              <div className='pl-1 text-xs text-gray-500'>Notification</div>
            </div>
          </div>
          <List meetings={meetings} setMeetings={setMeetings} form={form} setForm={setForm}/>
          <Add setMeetings={setMeetings} form={form} setForm={setForm}/>
        </div>
        <div className='fixed top-3 right-3 bg-gray-800 text-white rounded-md p-4 drop-shadow-2xl min-w-[25%] max-w-[45%]'>
          <Clock meetings={meetings} setMeetings={setMeetings} chimeTime={chimeTime}/>
        </div>
        <Todo />
      </div>
      <footer className="bg-gray-900 w-full p-14 mt-14">
          <a className='flex text-blue-400 hover:text-blue-800 justify-center' href="https://www.linkedin.com/in/narusadakuni/" target="_blank" rel="noopener noreferrer">&#169; Naru Sadakuni</a>
      </footer>
    </div>
  )
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);