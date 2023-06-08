import React from 'react';
import axios from 'axios';
import helpers from './helpers.jsx';

const Add = ({setMeetings, form, setForm}) => {
  const submit = (e) => {
    e.preventDefault();
    helpers.post(form)
    helpers.getAll(setMeetings)
    setForm({})
    document.getElementById('addDialog').close();
    document.getElementById('addForm').reset()
    document.getElementById('meeting-url').value = ''
  }

  const cancel = (e) => {
    e.preventDefault();
    setForm({})
    document.getElementById('addDialog').close();
    document.getElementById('addForm').reset();
    document.getElementById('meeting-url').value = ''
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'startTime' || name === 'endTime') {
      let time = Date.parse(value)
      setForm({ ...form, [name]: time });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  //min={(new Date()).toISOString().substring(0,16)} make this user timezone

  return (
    <dialog id='addDialog' className='w-1/3 p-0 shadow-2xl transition ease-in-out delay-150'>
      <form id='addForm' className='grid grid-cols-2 gap-y-4 rounded-md bg-gray-800 text-white p-4' onSubmit={(e) => submit(e)} onChange={(e) => changeHandler(e)}>
        <div className='grid col-span-2'>
          <label htmlFor='meeting-name'>Meeting Name</label>
          <input id='meeting-name' className='border border-gray-600 bg-gray-800 text-white rounded' type='text' name='title' placeholder='Example: Morning stand-up'/>
        </div>
        <div className='grid col-span-2'>
          <label className='' htmlFor='meeting-url'>Invite link</label>
          <textarea rows='5' id='meeting-url' className='border border-gray-600 bg-gray-800 text-white row-span-2 rounded' name='url' required placeholder='Example: https://zoom.us/j/15648942?'/>
        </div>
        <div className='col-span-3'>
          <label className='pr-10' htmlFor='meeting-start'>Start time</label>
          <input id='meeting-start' className='border border-gray-600 bg-gray-800 text-white rounded dark:text-white dark:[color-scheme:dark]' type='datetime-local' name='startTime' required/>
        </div>
        <div className='col-span-3'>
          <label className='pr-12' htmlFor='meeting-end'>End time</label>
          <input id='meeting-end' className='border border-gray-600 bg-gray-800 text-white rounded dark:text-white dark:[color-scheme:dark]' type='datetime-local' name='endTime' required/>
        </div>
        <div className='flex justify-evenly col-end-3 col-span-1 gap-1'>
          <button className='border border-green-500 w-1/2 rounded' type='submit'>Add</button>
          <button className='border border-gray-500 w-1/2 rounded' onClick={(e) => cancel(e)}>Cancel</button>
        </div>
      </form>
    </dialog>
  )
}

export default Add;