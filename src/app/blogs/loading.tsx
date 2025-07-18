import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='min-h-[calc(80vh-3.5vh-1px)] w-full flex flex-col justify-center items-center'>
        <Loader2 className='h-8 w-8 animate-spin'/>
        <h4 className="text-lg font-smeibold">Fetching Posts...</h4>
    </div>
  )
}

export default loading