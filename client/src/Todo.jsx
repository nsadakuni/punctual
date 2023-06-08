import React, { useState, useEffect } from 'react';
import axios from 'axios';
import helpers from './helpers.jsx';

const Todo = () => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => helpers.getTasks(setList), [])

  const addBtn = () => {
    if (newItem.trim() !== '') {
      helpers.postTask(newItem)
      setNewItem('');
      helpers.getTasks(setList)
    }
  };

  const deleteBtn = (idx) => {
    const curr = list.slice();
    let item = curr.splice(idx,1);
    setList(curr);
    helpers.removeTask(item)
    helpers.getTasks(setList)
  };

  const clickItem = (item, done, idx) => {
    let tmp = document.getElementById('todo'+idx).className
    if (tmp.indexOf('line-through') !== -1) {
      document.getElementById('todo'+idx).className = 'col-span-8'
      document.getElementById('check'+idx).className = 'hover:text-xl'
    } else {
      document.getElementById('todo'+idx).className = 'col-span-8 text-gray-400 line-through'
      document.getElementById('check'+idx).className = 'text-green-500 hover:text-xl'
    }
    helpers.putTask(item, done)
  }

  return (
    <div className='fixed mt-5 w-5/12 top-50 right-3 bg-gray-800 text-white rounded-md p-4 drop-shadow-2xl min-h-[25%]'>
      <h3 className='text-xl'>Todo:</h3>
      <div className='grid grid-cols-10 gap-1'>
        <textarea className='border border-gray-600 bg-gray-800 text-white rounded col-span-9' value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder='Add a new todo'/>
        <button className='transition ease-in-out delay-100 bg-blue-500 rounded-md text-xl hover:bg-blue-700'onClick={addBtn}>&#65291;</button>
      </div>
      <ul>
        {list.length ? list.map(({item, done}, idx) => (
          <li className='grid grid-cols-10 min-h-[30px] break-all mt-4' key={idx}>
            <div id={`todo${idx}`} className={done ? 'col-span-8 text-gray-400 line-through' : 'col-span-8'}>
              &#x2022; {item}
            </div>
            <button id={`check${idx}`} onClick={() => clickItem(item, done, idx)} className={done ? 'text-green-500 hover:text-xl' : 'hover:text-xl'}>&#10004;</button>
            <button className='col-span-1 hover:text-xl' onClick={() => deleteBtn(idx)}>&#128465;</button>
          </li>
        )) : <li>&#x2022; Nothing todo...</li>}
      </ul>
    </div>
  );
};

export default Todo;