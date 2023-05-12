import { useContext } from "react";
import {FavoriteContext, FavoritesContextType} from "../providers/FavoritesProvider"

export const useFavorite = () => {
    const {favorites, setFavorites} = useContext(FavoriteContext) as FavoritesContextType
    return {
        favorites,
        setFavorites
    }
}
