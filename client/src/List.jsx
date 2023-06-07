import React from 'react';
import Meeting from './Meeting.jsx';

const List = ({meetings, setMeetings, form, setForm}) => {
  let prev = null;

  return (
    <div className='w-full'>
      {meetings.map((meeting) => {
        const curr = new Date(meeting.startTime).toLocaleDateString('en-US', {month: 'long', day: 'numeric'}).toString();
        const newDay = curr !== prev;
        prev = curr;
        return (
          <React.Fragment key={meeting._id}>
            {newDay && <div className='font-bold text-2xl pt-3 mt-3 border-t-2'>{curr}</div>}
            <Meeting meeting={meeting} setMeetings={setMeetings} form={form} setForm={setForm}/>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default List;