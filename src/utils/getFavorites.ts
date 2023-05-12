
export const getFavorites= (favorites: {favorites: string[], id: string}[], userId: string) => {
    const r: string[] = [];
    favorites.forEach(({favorites, id: cakeId})=> {
        if(favorites.includes(userId)){
            r.push(cakeId)
        }
    })
    return r
}