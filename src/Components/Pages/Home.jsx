import React, { useEffect, useState } from 'react';
import service from '../../appWrite/config';
import Container from '../Container/Container';
import PostCard from '../PostCard';

export default function Home() {
    const[post,setPost]=useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        service.getPosts()
            .then((response) => {
                setPost(response.documents || []);  // Ensure response has documents
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Failed to load posts");
                setLoading(false);
            });
    }, []);

    
    if (post.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else{
    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {post.map((posts)=>(
                        <div className='p-2 w-1/4' key={posts.$id}>
                            <PostCard {...posts}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
    }
}
