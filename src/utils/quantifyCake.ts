import { Cake } from "../types/Cake";

export const quantifyCakes = (cakes: Cake[]) => {
  return Array.from(
    new Set(
      cakes
        .map((cake) => {
          const { id } = cake;
          const quantity = cakes.filter((currentCake) => {
            return currentCake.id === id;
          }).length;
          return { ...cake, quantity };
        })
        .map((cake) => JSON.stringify(cake))
    )
  ).map((cakeString) => JSON.parse(cakeString) as Cake & { quantity: number });
};
