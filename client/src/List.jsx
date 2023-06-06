import React from 'react';
import Meeting from './Meeting.jsx';

const List = ({meetings, deleteBtn}) => {

  return (
    <div>
      {meetings.map((meeting) => (
        <Meeting key={meeting._id} meeting={meeting} deleteBtn={deleteBtn}/>
      ))}
    </div>
  )
}

export default List;