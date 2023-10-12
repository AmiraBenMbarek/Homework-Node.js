import mongoose from "mongoose";
const { Schema, model } = mongoose;

const achatsSchema = new Schema({
    game: {
        type: Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    boughtDate: {
        type: Date,
        default: Date.now
    }
});

export default model("Achats", achatsSchema);