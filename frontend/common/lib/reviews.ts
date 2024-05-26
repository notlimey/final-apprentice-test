"use server";

import { fetchApi } from "./api";

export const deleteReview = async (id: string) => {
    const res = await fetchApi(`Reviews/${id}`, {
        method: "DELETE",
    })

    return res.data;
}