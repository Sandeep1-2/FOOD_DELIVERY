

// For adding food data to mongodb from assest.js

// import mongoose from "mongoose";
// import { food_list } from "../../React-Frontend/src/assets/assets.js";

// import foodModel from "../models/foodModel.js";
// mongoose.connect("mongodb://127.0.0.1:27017/FOODDELIVERYAPP");
// const foodDb = async () => {
//   try {
//     await foodModel.deleteMany({});
//     for (let i = 0; i < food_list.length; i++) {
//         const newFood = new foodModel({
//           name: food_list[i].name,
//           description: food_list[i].description,
//           price: Number(food_list[i].price),
//           image: food_list[i].image,
//           category: food_list[i].category
//         });
//         await newFood.save();
//       }
//     console.log("Database population completed.");
//   } catch (err) {
//     console.error("Error populating the database:", err);
//   } finally {
//     mongoose.connection.close();
//     console.log("MongoDB connection closed.");
//   }
// };
// export default foodDb;
// foodDb();




// For MongoDb atlas
import mongoose from "mongoose"

export const connectDb=async ()=>{
    await mongoose.connect(process.env.MONGO_CONNECTION_SECRET).then(()=>console.log("Db Connected"))  
}

// import { food_list } from "../../React-Frontend/src/assets/assets.js";

// import foodModel from "../models/foodModel.js";
// const foodDb = async () => {
//   try {
//     await foodModel.deleteMany({});
//     for (let i = 0; i < food_list.length; i++) {
//         const newFood = new foodModel({
//           name: food_list[i].name,
//           description: food_list[i].description,
//           price: Number(food_list[i].price),
//           image: food_list[i].image,
//           category: food_list[i].category
//         });
//         await newFood.save();
//       }
//     console.log("Database population completed.");
//   } catch (err) {
//     console.error("Error populating the database:", err);
//   } finally {
//     mongoose.connection.close();
//     console.log("MongoDB connection closed.");
//   }
// };
// export default foodDb;
// foodDb();
