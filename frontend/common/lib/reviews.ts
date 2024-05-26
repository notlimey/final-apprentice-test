"use server";

import type { CreateReviewDto } from "../types/reviews.types";
import { fetchApi } from "./api";

export const deleteReview = async (id: string) => {
    const res = await fetchApi(`Reviews/${id}`, {
        method: "DELETE",
    })

    return res.data;
}
export const createReview = async (restaurantId: string, review: CreateReviewDto) => {
    const res = await fetchApi(`Reviews/${restaurantId}`, {
        method: "POST",
        data: review,
    });

    return res.data;
}