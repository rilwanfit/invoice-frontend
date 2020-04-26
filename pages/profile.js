import React from 'react';
import { Cookies } from 'react-cookie';
import { handleAuthSSR } from '../utils/auth';
import Layout from './../components/Layout';


// set up cookies
const cookies = new Cookies();

class Profile extends React.Component {

  onPingCall = async (e) => {
    const token = cookies.get('token')

    // try {
    //   const res = await axios.get(process.env.RESTURL + '/profile', { headers: { 'Authorization': token } });
    //   console.log(res.data.msg);
    // } catch (err) {
    //   console.log(err.response.data.msg);
    // }

    try {
      fetch(process.env.RESTURL + '/profile', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            reject(new Error('Unautherized'));
          }
        })
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      reject(new Error('You have an error in your code or there are Network issues.'));
    }
  }

  render() {
    return (
      <Layout>
        <div>
          <h2>Secret page</h2>
          <p>Only accessible via a valid JWT</p>
          <br></br>
          <button onClick={(e) => this.onPingCall(e)}>Ping Call</button>
          <p>Check console for response</p>
        </div>
      </Layout>

    );
  }
}

export default Profile;