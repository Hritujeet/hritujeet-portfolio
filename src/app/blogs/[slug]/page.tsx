import BlogPostSection from '@/components/BlogPost'
import {Metadata} from 'next'
import React from 'react'

const page = async ({params}: { params: { slug: string } }) => {
    const {slug} = await params
    return (
        <div className='md:w-[70vw] lg:w-[60vw] xl:w-[50vw] sm:w-[80vw] w-[85vw] mx-auto'>
            <BlogPostSection slug={slug}/>
        </div>
    )
}
export const metadata: Metadata = {
    title: "Read Blogs | Hritujeet",
    description: "Read blogs about web development, programming, and more."
};
export default page