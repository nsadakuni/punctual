import React, { useState, useEffect } from 'react';
import helpers from './helpers.jsx';

const Clock = ({ meetings, setMeetings }) => {
  const [count, setCount] = useState(0);
  const [nextUp, setNextUp] = useState({})

  const timeTilNext = () => {
    let next = meetings.find(meeting => !meeting.past)
    setNextUp(next)
    if (next) {
      setCount(next.startTime - Date.now());
    } else {
      setCount(null)
    }
  };

  useEffect(() => {
    if (count < 0) {
      helpers.put(nextUp, setMeetings)
    }
  },[count])

  useEffect(() => {
      const timer = setInterval(timeTilNext, 1000);
      return () => {clearInterval(timer)};
  }, [meetings]);

  const format = (time) => {
    const sec = Math.floor(time / 1000) % 60;
    const min = Math.floor(time / 1000 / 60) % 60;
    const hr = Math.floor(time / 1000 / 60 / 60);

    return `${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      {count === null ? <div>No upcoming meetings</div> :
        <div>
          <div className='text-4xl'>Next meeting in {format(count)}</div>
          <div className='text-xl'>{nextUp && nextUp.title}</div>
        </div>}
    </div>
  );
};


export default Clock;