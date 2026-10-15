"use client"
import { useQuery } from "@tanstack/react-query";

export const useProjects = () => {
    const query = useQuery({
        queryFn: async () => {
            const response = await fetch("/api/projects/fetchprojects");
            const data = await response.json();
            // Surface 503 / other errors so React Query sets isError
            if (!response.ok) {
                throw new Error(data?.error ?? "Failed to fetch projects");
            }
            return data;
        },
        queryKey: ["projects"],
        retry: 3,
        retryDelay: (attempt) => Math.min(400 * Math.pow(2, attempt), 8000),
    });
    return query;
};