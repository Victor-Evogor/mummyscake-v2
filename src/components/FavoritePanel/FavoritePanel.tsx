import {useQuery} from "@apollo/client"
import { GET_CAKE } from "../../gql/getCake.gql"
import {
    ListItemButton,
    ListItemText
} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const FavoriteItem = ({id}: {id: string}) => {
    const {data, loading, error} = useQuery(GET_CAKE, {
        variables: {
            id
        }
    })
    const navigate = useNavigate()
    
    if(loading) return <span>Loading Screen</span>
    if(error) return <span>error screen</span>
    if(!data) return <span>{JSON.stringify(data)}</span>
    return  <ListItemButton onClick={()=>{
        navigate(`/cakes/${id}`)
    }} sx={{ pl: 4 }}>
        <ListItemText primary={data.getCake.name} />
    </ListItemButton>

}