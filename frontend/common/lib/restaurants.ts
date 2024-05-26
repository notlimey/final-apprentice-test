"use server";

import type { CreateRestaurantDto } from "../types/restaurants.types";
import { fetchApi } from "./api";

// export const deleteReview = async (id: string) => {
//     const res = await fetchApi(`Reviews/${id}`, {
//         method: "DELETE",
//     })

//     return res.data;
// }
export const createRestaurant = async (restaurant: CreateRestaurantDto) => {
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    const res = await fetchApi(`Restaurants`, {
        method: "POST",
        data: restaurant,
    });

    return res.data;
}