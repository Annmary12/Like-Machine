import React, { useState, useEffect} from 'react'

import './Home.scss'
import Card from '../../components/Card'
import { sortByDate } from '../../utils/helper'

const LIMIT = 8
const baseUrl = process.env.REACT_APP_LIKE_MACHINE_API
const Home = () => {
  const [links, setLinks] = useState()
  const [error, setError] = useState(false)

  useEffect(() => {
    getLinks()
  }, [])

  const getLinks = async() => {
    const sessionId = localStorage.getItem('userId')
    fetch(`${baseUrl}/links`, {
    headers: {
      'Authorization': `Bearer ${sessionId}`
    }})
    .then(res => res.json())
    .then((data) => {
       setLinks(sortByDate(data))
    })
    .catch((error) => {
        setError(error)
    });
  }

  const handleLike = async(item) => {
    const sessionId = localStorage.getItem('userId')
    fetch(`${baseUrl}/links/${item.id}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionId}`
      }
    }).then(res => {
      if(res.ok && res.status == 204) {
        const updateLinks = []
       links.forEach(link =>{
        if (link.id === item.id) {
          link.liked = true
          link.like_count += 1

          updateLinks.push(link)
        } else { updateLinks.push(link) }
       })

        setLinks(updateLinks)
      }
     })
  }

  const handleUnLike = (item) => {
    const sessionId = localStorage.getItem('userId')
    fetch(`${baseUrl}/links/${item.id}/like`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionId}`
      }
    }).then(res => {
      if(res.ok && res.status == 204) {
        const updateLinks = []
       links.forEach(link =>{
        if (link.id === item.id) {
          link.liked = false
          link.like_count -= 1

          updateLinks.push(link)
        } else { updateLinks.push(link) }
       })

        setLinks(updateLinks)
      }
     })
  }

  const handleDeleteLink = (item) => {
    const sessionId = localStorage.getItem('userId')
    fetch(`${baseUrl}/links/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionId}`
      }
    }).then(res => {
      if(res.ok && res.status == 204) {
        const updateLinks = links.filter(link => link.id !== item.id)
        setLinks(updateLinks)
      }
     })
  }

  return (
    <div className="container home">
    <div className="row">
      {links && links.map(link => (
         <div className="col-sm-3 home__item" key={link.id}>
         <Card item={link} handleLike={handleLike} handleUnLike={handleUnLike} handleDeleteLink={handleDeleteLink}/>
       </div>
      ))}
    </div>
  </div>
  )
}

export default Home
