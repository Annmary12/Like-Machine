import React from 'react'
import FacebookLogin from 'react-facebook-login';
import { Button } from 'reactstrap'


const baseUrl = process.env.REACT_APP_LIKE_MACHINE_API

const Auth = ({type}) => {
  const responseFacebook = (response) => {
    
    if (response.accessToken) {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "facebook_token": response.accessToken }),
      }
      fetch(`${baseUrl}/session`, fetchData)
        .then(res => res.json())
        .then((data) => {
          localStorage.setItem('userId', data.id);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  const handleLogout = () => {
    const sessionId = localStorage.getItem('userId')
    let fetchData = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionId}`
      }
    }

    fetch(`${baseUrl}/session`, fetchData)
      .then(res => console.log(res))
      .then(() => {
        localStorage.removeItem('userId');
        window.location.reload();
      })
      .catch(error => {
        console.log(error)
      });
  }

  if (type == 'logout') {
    return <Button type='primary' onClick={handleLogout}>Logout</Button>
  }
  return (
    <FacebookLogin
      appId="311974623091412"
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
    />
  )
}



export default Auth