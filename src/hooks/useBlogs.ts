"use client"
import { BlogPost } from "@prisma/client";
import {useQuery} from "@tanstack/react-query";

export const useBlogs = () => {
    const query = useQuery({
        queryFn: async () => {
            const response = await fetch("/api/posts/fetchposts")
            const data = await response.json()
            
            return data.posts.slice(0, 3) as BlogPost[]
        },
        queryKey: ['posts']
    })
    return {data: query.data, isPending: query.isPending, isError: query.isError}
}