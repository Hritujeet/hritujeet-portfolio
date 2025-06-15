"use client"
import {useQuery} from "@tanstack/react-query";

export const useProjects = () => {
    const query = useQuery({
        queryFn: async () => {
            const response = await fetch("/api/projects/fetchprojects")
            const data = await response.json()
            return data
        },
        queryKey: ['projects']
    })
    return query
}