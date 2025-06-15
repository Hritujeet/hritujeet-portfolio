"use client"
import {useQuery} from "@tanstack/react-query";

export const usePost = (slug: string) => {
    const query = useQuery({
        queryFn: async () => {
            const response = await fetch(`/api/posts/${slug}`)
            const data = await response.json()
            return data
        },
        queryKey: ['post', slug]
    })
    return query
}