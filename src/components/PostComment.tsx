"use client"
import React, { useState } from 'react'

const PostComment = ({postId}:{postId: string}) => {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (comment.trim()) {
      console.log('Posting comment for post:', postId, 'Comment:', comment)
      // Add your comment submission logic here
      setComment('')
    }
  }

  return (
    <div className='bg-base-300 p-4 rounded-lg'>
      <div className='flex flex-col gap-3'>
        <textarea 
          className='textarea textarea-bordered w-full min-h-24 resize-none'
          placeholder='Write your comment...'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className='flex justify-end'>
          <button 
            className='btn btn-primary'
            onClick={handleSubmit}
            disabled={!comment.trim()}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostComment