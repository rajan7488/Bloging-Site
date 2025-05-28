import React from 'react'
import service from '../appWrite/config'
import { Link } from 'react-router-dom' 

export default function PostCard({ $id, title, featuredimage }) {
  const imageUrl = service.getFilePreview(featuredimage);
  console.log("Image URL:", imageUrl);
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {featuredimage ? (
            <img
              src={service.getFilePreview(featuredimage)}
              alt={title}
              className='rounded-xl'
            />
          ) : (
            <div className="bg-gray-300 h-48 rounded-xl flex items-center justify-center text-gray-600">
              No Image
            </div>
          )}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  )
}
