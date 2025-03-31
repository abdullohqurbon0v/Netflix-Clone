import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO URL not found  in .env");
  }

  if (isConnected) return;
  try {
    const options: ConnectOptions = {
      dbName: "netflix",
      autoCreate: true,
    };

    await mongoose.connect(process.env.MONGO_URL, options);

    isConnected = true;
    console.log("MONGO_DB connected");
  } catch (error) {
    console.log("ERROR CONNECTING ", error);
  }
};
