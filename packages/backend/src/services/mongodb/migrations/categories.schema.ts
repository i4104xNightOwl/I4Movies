import { ICategories } from "@movies/interfaces";
import { Document, Schema, model } from "mongoose";

type CategoriesDocument = ICategories & Document;

const CategoriesSchema = new Schema<CategoriesDocument>({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const CategoriesDB = model<CategoriesDocument>("Categories", CategoriesSchema);
