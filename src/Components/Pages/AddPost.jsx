import React from 'react';
import Container from '../Container/Container';
import PostForm from '../Post-Form/PostForm';

export default function AddPost() {
  return (
    <div className='py-8'>
      <Container>
        <PostForm/>
      </Container>
    </div>
  )
}
