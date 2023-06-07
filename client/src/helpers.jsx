import axios from 'axios';

const helpers = {

  getAll: (setMeetings) => {
    axios
      .get('/meetings')
      .then(({data}) => setMeetings(data))
      .catch(err => console.error('Could not find meetings', err))
  },

  put: (meeting, setMeetings) => {
    axios
      .put('/meetings', meeting)
      .then(() => (axios.get('/meetings')))
      .then(({data}) => setMeetings(data))
      .catch(err => console.error('Could not put meetings', err))
  }

}

export default helpers