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

  edit: (params) => {
    axios
      .put('/meetings/edit', params)
      .catch(err => console.error('Could not edit meeting', err))
  },

  delete: (meeting) => {
    axios
      .delete('/meetings', {data: {meeting}})
      .catch(err => console.error(err))
  }

}

export default helpers