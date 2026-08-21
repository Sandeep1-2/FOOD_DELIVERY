import "dotenv/config";
import express from "express";
import cors from "cors";
import expressSession from "express-session";
import passport from "passport";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { connectDb } from "./config/mongodb.js";
import { uploadsDirectory } from "./config/paths.js";
import { stripeWebhook } from "./controllers/orderController.js";
import userModel from "./models/userModel.js";

const requiredVariables = ["MONGO_CONNECTION_SECRET", "JWT_SECRET", "STRIPE_SECRET_KEY"];
const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length) {
  throw new Error(`Missing required environment variables: ${missingVariables.join(", ")}`);
}

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.post("/api/order/webhook", express.raw({ type: "application/json" }), stripeWebhook);
app.use(express.json());
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin not allowed by CORS"));
  },
  credentials: true,
}));

connectDb();

app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET || process.env.JWT_SECRET,
  cookie: { secure: process.env.NODE_ENV === "production" },
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  userModel.findById(id)
    .then((user) => done(null, user))
    .catch((error) => done(error));
});

app.use("/api/food", foodRouter);
app.use("/images", express.static(uploadsDirectory));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
