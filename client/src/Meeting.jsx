import React from 'react';

const Meeting = ({meeting, deleteBtn}) => {
  const time = new Date(meeting.time).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).toString();

  return (
    <div className={`meeting ${meeting.past ? 'pastMeeting' : 'futureMeeting'}`}>
      <div>
        {meeting.title}
      </div>
      <div>
        {time}
      </div>
      <button onClick={() => deleteBtn(meeting._id)}>Delete</button>
    </div>
  )
}

export default Meeting;