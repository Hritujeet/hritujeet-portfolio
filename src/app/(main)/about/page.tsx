import { Metadata } from 'next'
import AboutPage from '@/components/AboutPage'
import React from 'react'

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about Hritujeet Sharma, a passionate full-stack developer building modern web experiences.',
}

const page = () => {
  return (
    <div><AboutPage /></div>
  )
}

export default page