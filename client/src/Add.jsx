import React from 'react';
import axios from 'axios';
import helpers from './helpers.jsx';

const Add = ({setMeetings}) => {
  const submit = (e) => {
    e.preventDefault();
    document.getElementById('addDialog').close();
    const time = Date.parse(e.target[2].value);
    axios.post('/meetings', {title: e.target[0].value, url: e.target[1].value, time: time})
      .then(() => document.getElementById('addForm').reset())
      .then(() => helpers.getAll(setMeetings))
      .catch(err => console.error('Could not add new meeting', err))
  }

  const cancel = (e) => {
    e.preventDefault();
    document.getElementById('addDialog').close();
    document.getElementById('addForm').reset();
  }

  //min={(new Date()).toISOString().substring(0,16)} make this user timezone

  return (
    <dialog id='addDialog'>
      <form id='addForm' onSubmit={(e) => submit(e)}>
        <input type='text' placeholder='Meeting Name'/>
        <input type='text' required placeholder='Invite URL'/>
        <input type='datetime-local' required/>
        <button type='submit'>Submit</button>
        <button onClick={(e) => cancel(e)}>Cancel</button>
      </form>
    </dialog>
  )
}

export default Add;