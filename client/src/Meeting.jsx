import React from 'react';
import helpers from './helpers.jsx';

const Meeting = ({meeting, setMeetings, form, setForm}) => {

  const startTime = new Date(meeting.startTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  }).toString();

  const endTime = new Date(meeting.endTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  }).toString();

  const deleteBtn = (meeting) => {
    helpers.delete(meeting)
    helpers.getAll(setMeetings)
  }

  const editBtn = () => {
    setForm({
      _id: meeting._id,
      title: meeting.title,
      url: meeting.url,
      startTime: meeting.startTime,
      endTime: meeting.endTime
    })
    document.getElementById('meeting-name').value = meeting.title
    document.getElementById('meeting-url').value = meeting.url
    document.getElementById('meeting-start').value = new Date(meeting.startTime - 2.52e+7).toISOString().slice(0, 16).replace('T', ' ')
    document.getElementById('meeting-end').value = new Date(meeting.endTime - 2.52e+7).toISOString().slice(0, 16).replace('T', ' ')
    document.getElementById('addDialog').showModal()
  }

  return (
    <div className={`grid grid-cols-3 gap-2`}>
      <div className={`font-semibold col-span-1 ${meeting.past && 'text-gray-400'}`}>
        &#x2022; {meeting.title}
      </div>
      <div className={`pl-10 ${meeting.past && 'text-gray-400'}`}>
        {startTime} - {endTime}
      </div>
      <div className='flex justify-end'>
        {/* <button>Archive</button> */}
        <button className='flex items-center justify-center h-6 w-6 m-1 text-sm bg-transparent hpy-2 px-4 hover:text-lg' onClick={() => editBtn()}>&#128221;</button>
        <button className='flex items-center justify-center h-6 w-6 m-1 text-sm bg-transparent py-2 px-4 hover:text-lg' onClick={() => deleteBtn(meeting._id)}>&#128465;</button>
        </div>
    </div>
  )
}

export default Meeting;