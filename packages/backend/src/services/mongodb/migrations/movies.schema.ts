import { IMovies } from "@movies/interfaces";
import { Document, model, Schema } from "mongoose";

type MoviesDocument = IMovies & Document;

const MovieSchema = new Schema<MoviesDocument>({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    originName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    posterUrl: {
        type: String,
        required: true,
    },
    thumbUrl: {
        type: String,
        required: true,
    },
    episodeTotal: {
        type: Number,
        required: true,
    },
    episodeCurrent: {
        type: Number,
        required: true,
    },
    quality: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const MoviesDB = model<MoviesDocument>("Movie", MovieSchema);
