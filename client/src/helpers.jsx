import axios from 'axios';

const helpers = {

  getAll: (setMeetings) => {
    axios
      .get('/meetings')
      .then(({data}) => setMeetings(data))
      .catch(err => console.error('Could not find meetings', err))
  },

  post: (form) => {
    axios
      .post('/meetings', form)
      .catch(err => console.error(err))
  },

  put: (meeting, setMeetings) => {
    axios
      .put('/meetings', meeting)
      .then(() => (axios.get('/meetings')))
      .then(({data}) => setMeetings(data))
      .catch(err => console.error('Could not put meetings', err))
  },

  delete: (meeting) => {
    axios
      .delete('/meetings', {data: {meeting}})
      .catch(err => console.error(err))
  },

  getTasks: (setList) => {
    axios
      .get('/tasks')
      .then(({data}) => setList(data))
      .catch(err => console.error(err))
  },

  putTask: (item, done) => {
    axios.put('/tasks', {item: item, done: !done})
      .catch(err => console.error(err))
  },

  postTask: (newItem) => {
    axios
      .post('/tasks', {newItem})
      .catch(err => console.error(err))
  },

  removeTask: (item) => {
    axios
      .delete('/tasks', {data: item})
      .catch(err => console.error(err))
  }

}

export default helpers