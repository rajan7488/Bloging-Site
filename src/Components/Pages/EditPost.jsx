import React, { useEffect, useState } from 'react';
import Container from '../Container/Container';
import PostForm from '../Post-Form/PostForm';
import service from '../../appWrite/config';
import { useParams,useNavigate } from 'react-router-dom';

export default function EditPost() {
    const[post,setPost]=useState(null);
    const {slug}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }
                else{
                    navigate('/')
                }
            })
        }
    },[slug,navigate])
  return post?(
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null
}
