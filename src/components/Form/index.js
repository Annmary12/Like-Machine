import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const baseUrl = process.env.REACT_APP_LIKE_MACHINE_API

const FormComponent = (props) => {
  const [data, setData] = useState({})

  const handleOnchange = event => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const sessionId = localStorage.getItem('userId')
    console.log(data, 'data...')

    if (data.url) {
      let fetchData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionId}`
        },
        body: JSON.stringify(data)
      }

      fetch(`${baseUrl}/links`, fetchData)
        .then(res => {
          if(res.ok && res.status === 200){
            window.location.reload()
          } else {
             throw new Error('An Error Occured')
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }

  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="url">Url</Label>
        <Input type="text" name="url" id="url" placeholder="Enter Url" onChange={handleOnchange} required />
      </FormGroup>
      <Button color='success'>Submit</Button>
    </Form>
  );
}

export default FormComponent;