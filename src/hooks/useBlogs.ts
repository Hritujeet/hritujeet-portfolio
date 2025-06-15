"use client"
import {useQuery} from "@tanstack/react-query";

export const useBlogs = () => {
    const query = useQuery({
        queryFn: async () => {
            const response = await fetch("/api/posts/fetchposts")
            const data = await response.json()
            return data
        },
        queryKey: ['posts']
    })
    return query
}