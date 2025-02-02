import mongoose from "mongoose";

const hackathonDetailsSchema = new mongoose.Schema({}, {
    strict: false  // Include All Keys
});

const HackathonDetailsModel = mongoose.model("HackathonDetails", hackathonDetailsSchema, "details");

export default HackathonDetailsModel;
