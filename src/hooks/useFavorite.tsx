import { useContext } from "react";
import {
  FavoriteContext,
} from "../providers/FavoritesProvider";

export const useFavorite = () => {
    const states =  useContext(FavoriteContext);
  if (!states) {
    return {
      favorites: [],
      setFavorites: () => [],
    };
  }
  const { favorites, setFavorites } =states
  return {
    favorites,
    setFavorites,
  };
};
