import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"


export const useGetWorkspaces = () => {
    const data = useQuery(api.workspaces.current); // si algo falla cambia current a get
    const isLoading = data === undefined;

    return { data, isLoading }
};