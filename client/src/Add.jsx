import React from 'react';
import axios from 'axios';
import helpers from './helpers.jsx';

const Add = ({setMeetings}) => {
  const submit = (e) => {
    e.preventDefault();
    document.getElementById('addDialog').close();
    const startTime = Date.parse(e.target[2].value);
    const endTime = Date.parse(e.target[3].value);
    axios.post('/meetings', {title: e.target[0].value, url: e.target[1].value, startTime: startTime, endTime: endTime})
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
    <dialog id='addDialog' className='w-1/3 p-0 shadow-2xl'>
      <form id='addForm' className='grid grid-cols-2 gap-y-4 rounded-md bg-gray-800 text-white p-4' onSubmit={(e) => submit(e)}>
        <div className='grid col-span-2'>
          <label htmlFor='meeting-name'>Meeting Name</label>
          <input id='meeting-name' className='border border-gray-600 bg-gray-800 text-white rounded' type='text' placeholder='Example: Morning stand-up'/>
        </div>
        <div className='grid col-span-2'>
          <label className='' htmlFor='meeting-url'>Invite link</label>
          <textarea rows='5' id='meeting-url' className='border border-gray-600 bg-gray-800 text-white row-span-2 rounded' required placeholder='Example: https://zoom.us/j/15648942?'/>
        </div>
        <div className='col-span-3'>
          <label className='pr-10' htmlFor='meeting-start'>Start time</label>
          <input id='meeting-start' className='border border-gray-600 bg-gray-800 text-white rounded dark:text-white dark:[color-scheme:dark]' type='datetime-local' required placeholder='Start time'/>
        </div>
        <div className='col-span-3'>
          <label className='pr-12' htmlFor='meeting-end'>End time</label>
          <input id='meeting-end' className='border border-gray-600 bg-gray-800 text-white rounded dark:text-white dark:[color-scheme:dark]' type='datetime-local' required placeholder='End time'/>
        </div>
        <div className='flex justify-evenly col-end-3 col-span-1 gap-1'>
          <button className='border border-green-500 w-1/2 rounded' type='submit'>Submit</button>
          <button className='border border-gray-500 w-1/2 rounded' onClick={(e) => cancel(e)}>Cancel</button>
        </div>
      </form>
    </dialog>
  )
}

export default Add;