import React from 'react';
import {
  Card, CardImg, CardBody,
} from 'reactstrap';
import TextTruncate from 'react-text-truncate';
import { isAuthenticated } from '../../utils/helper'

import './Card.scss'

const CardComp = ({item, handleLike, handleUnLike, handleDeleteLink}) => {
  const handleVote = () => {
    return item.liked ? handleUnLike(item) : handleLike(item)
  }
  return (
    <div className=''>
      <Card>
        <CardImg top width="100%" src={item.image_url} alt="Card image cap" />
        <CardBody>
          <a href={item.url} target='_blank' rel="noopener noreferrer"><TextTruncate line={1} text={item.title}/></a>
          <TextTruncate line={2} text={item.description}/>
          <div className='footer'>
            <div className='vote'>
            { isAuthenticated() && 
            <span onClick={handleVote}>
              <i className={`fa fa-heart ${item.liked ?  'liked' : ''}`}></i>
            </span>
            }
            <span className='likes'>{item.like_count} likes</span>
            </div>
            { item.owned && <span onClick={() => handleDeleteLink(item)}>
              <i className="fa fa-trash"></i>
            </span>}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardComp;