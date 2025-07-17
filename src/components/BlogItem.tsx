import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
    title: string,
    img: string,
    slug: string,
    description: string
    createdAt: string
}

const BlogItem = (props: Props) => {
    const {title, img, slug, description, createdAt} = props;
    console.log(img)
    console.log(createdAt)

    const formatTime = (isoString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(isoString));
    };
  return (
    <div className='group relative border p-0 rounded-2xl duration-300 cursor-default overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/10'>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 duration-300"></div>
        
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 duration-300 blur-sm -z-10"></div>
        
        <div className="relative z-10 p-4 space-y-6">
            <div className="header relative overflow-hidden rounded-xl">
                <Image 
                    src={img.trimEnd()}
                    alt='blog-image' 
                    width={1000} 
                    height={1000} 
                    className='h-64 w-full object-cover rounded-xl transform group-hover:scale-105 duration-300'
                />
                <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 group-hover:opacity-100 duration-300 rounded-xl"></div>
            </div>
            
            <div className="body space-y-4">
                <h2 className="text-2xl leading-tight duration-300">
                    {title}
                </h2>
                <p className='font-inter text-sm leading-relaxed duration-300'>
                    {description}
                </p>
                <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h22a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {formatTime(createdAt)}
                    </span>
                </div>
            </div>
            
            <div className="footer flex items-center justify-between">
                <Link 
                    href={`/blogs/${slug}`}
                    className="group/btn relative font-medium text-sm px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg cursor-pointer duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 border"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Read More
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg opacity-0 group-hover/btn:opacity-20 duration-300 blur"></div>
                </Link>
                
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-800/50 rounded-lg duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BlogItem