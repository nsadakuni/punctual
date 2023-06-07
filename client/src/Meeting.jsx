import React from 'react';

const Meeting = ({meeting, deleteBtn}) => {

  const startTime = new Date(meeting.startTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  }).toString();

  const endTime = new Date(meeting.endTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  }).toString();

  return (
    <div className={`grid grid-cols-3 gap-2  ${meeting.past ? 'pastMeeting' : 'futureMeeting'}`}>
      <div className='font-semibold col-span-1'>
        &#x2022; {meeting.title}
      </div>
      <div className='pl-10'>
        {startTime} - {endTime}
      </div>
      <button className='flex items-center justify-self-end h-6 w-20 m-1 text-sm bg-transparent hover:bg-red-500 text-black-500 hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded' onClick={() => deleteBtn(meeting._id)}>Delete</button>
    </div>
  )
}

export default Meeting;