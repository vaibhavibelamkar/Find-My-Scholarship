import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import schemeRoute from "./routes/scheme.route.js";
import cors from "cors";

dotenv.config({});
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API
app.use("/api/auth", userRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/scholarships", schemeRoute);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/media", mediaRoute);
// app.use("/api/v1/purchase", purchaseRoute);
// app.use("/api/v1/progress", courseProgressRoute);

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
