import axios from 'axios';

const helpers = {

  getAll: (setMeetings) => {
    axios.get('/meetings')
      .then(({data}) => setMeetings(data))
      .catch(err => console.error('Could not find meetings', err))
  }

}

export default helpers