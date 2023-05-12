import {
  createContext,
  useState,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import { SetState } from "../types/setState";

export interface FavoritesContextType {
  favorites: string[];
  setFavorites: SetState<string[]>;
}

export const FavoriteContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { Provider } = FavoriteContext;
  return (
    <Provider
      value={{
        favorites,
        setFavorites,
      }}
    >
      {children}
    </Provider>
  );
};
