import BlogsContainer from '@/components/BlogsContainer'
import CTA from '@/components/CTA'
import { Metadata } from 'next'
import React from 'react'

const page = () => {
  return (
    <div className='w-[90vw] mx-auto'>
        <h1 className="text-5xl font-bold my-10">Read Blogs</h1>
        <BlogsContainer />
        <CTA />
    </div>
  )
}
export const metadata: Metadata = {
  title: "Read Blogs | Hritujeet",
  description: "Read blogs about web development, programming, and more."
};
export default page