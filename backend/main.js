import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import RegistrationModel from "./models/registration.js";
import HackathonDetailsModel from "./models/hackathonDetails.js";

dotenv.config();
const app = express();

// Configurations
const PORT = 80;
const CLUSTER_NAME = "Cluster0", DATABASE_NAME = "hackathon-template";

app.use(express.json());  // Middleware to Parse JSON Body

// Endpoint: Get Hackathon Details
app.get("/details", async (req, res) => {
  try
  {
    const data = await HackathonDetailsModel.findOne();
    const details = data.toObject();
    
    delete details["_id"];  // Delete unnecessary fields
    res.status(200).send(details);
  }
  catch
  {
    res.status(500).send({success: false, error: "Something went wrong!"});  // Internal Server Error
  }
});

// Endpoint: Post Registration Form Data
app.post("/register", async (req, res) => {
  const registration = new RegistrationModel(req.body);

  try
  {
    await registration.save();  // Insert Model to Database
    return res.status(200).json({success: true});  // Return OK!
  }
  catch (err)
  {
    // Schema Validation Error
    if (err instanceof mongoose.Error.ValidationError)
    {
      return res.status(400).json({
        "success": false,
        "error": "Required fields are missing or invalid."
      });
    }

    // Some Other Error
    return res.status(500).json({success: false, error: "Internal server error"});
  }
});

// Connect to Atlas Database
async function mongoConnect()
{
  console.log("Connecting to MongoDB Cluster...");

  try
  {
    const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.pms6w.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority&appName=${CLUSTER_NAME}`
    
    await mongoose.connect(uri);
    console.log("MongoDB Connection Succeeded!");
  }
  catch (err)
  {
    console.log("Connection to MongoDB Failed: " + err);
    process.exit(1);
  }
}

// Connect to MongoDB Atlas
mongoConnect().then(() => {
  app.listen(PORT, () => console.log(`\nListening on port ${PORT}...`));  // Start Server
});
