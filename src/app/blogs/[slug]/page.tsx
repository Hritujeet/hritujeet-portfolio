import BlogPostSection from '@/components/BlogPost'
import {Metadata} from 'next'
import React from 'react'

const page = async ({params}: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    return (
        <div className='md:w-[80vw] lg:w-[70vw] xl:w-[55vw] sm:w-[85vw] w-full mx-auto my-10'>
            <BlogPostSection slug={slug}/>
        </div>
    )
}
export const metadata: Metadata = {
    title: "Read Blogs | Hritujeet",
    description: "Read blogs about web development, programming, and more. Stay updated with the latest trends and insights in the tech world. Join our community of developers and enthusiasts.",
    keywords: "react, nextjs, javascript, web development, programming, blogs, tech trends, developer community, insights",
};
export default page