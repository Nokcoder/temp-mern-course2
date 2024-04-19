import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

// import { validateTest } from "./middleware/validationMiddleware.js";

//custom imports
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//FOR TESTING
// app.post(
//   "/api/v1/test",
//   validateTest,
//   (req, res) => {
//     const { name } = req.body;
//     res.json({ message: `hello ${name}` });
//   }
// );

// //GET ALL JOBS
// app.get("/api/v1/jobs", (req, res) => {
//   res.status(201).json({ jobs });
// });

// //GET SINGLE JOB
// app.get("/api/v1/jobs/:id", (req, res) => {
//   const { id } = req.params;
//   const job = jobs.find((job) => job.id === id);
//   if (!job) {
//     return res.status(404).json({ msg: `no job with id ${id}` });
//   }
//   res.status(200).json({ job });
// });

// //CREATE JOBS
// app.post("/api/v1/jobs", (req, res) => {
//   const { company, position } = req.body;
//   if (!company || !position) {
//     return res.status(400).json({ msg: "please provide company and postion" });
//   }
//   const id = nanoid(10);
//   const job = { id, company, position };
//   jobs.push(job);

//   res.status(200).json({ jobs });
// });

// //EDIT JOB
// app.patch("/api/v1/jobs/:id", (req, res) => {
//   const { company, position } = req.body;
//   if (!company || !position) {
//     return res.status(400).json({ msg: "please provide company and position" });
//   }
//   const { id } = req.params;
//   const job = jobs.find((job) => job.id === id);
//   if (!job) {
//     return res.status(404).json({ msg: `no job with id ${id}` });
//   }

//   job.company = company;
//   job.position = position;
//   res.status(200).json({ msg: "job modified", job });
// });

// //DELETE JOB
// app.delete("/api/v1/jobs/:id", (req, res) => {
//   const { id } = req.params;
//   const job = jobs.find((job) => job.id === id);
//   if (!job) {
//     return res.status(404).json({ msg: `no job with ID ${id}` });
//   }
//   const newJobs = jobs.filter((job) => job.id !== id);
//   jobs = newJobs;
//   res.status(200).json({ msg: "job deleted" });
// });

//Summary
// app.get("/api/v1/jobs");
// app.post("/api/v1/jobs");
// app.get("/api/v1/jobs/:id");
// app.patch("/api/v1/jobs/:id");
// app.delete("/api/v1/jobs:id");
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "./public", "index.html"));
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "page not found" });
});

//Moved to Middleware
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).json({ msg: "something went wrong" });
// });

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

// app.listen(port, () => {
//   console.log(`server running on PORT ${port}...`);
// });

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

////Old method
// const getData = async () => {
//   const response = await fetch(
//     "https://www.course-api.com/react-useReducer-cart-project"
//   );
//   const cartData = await response.json();
//   console.log(cartData);
// };
// getData();

////try catch
// try {
//   const response = await fetch(
//     "https://www.course-api.com/react-useReducer-cart-project"
//   );
//   const cartData = await response.json();
//   console.log(cartData);
// } catch (error) {
//   console.log(error);
// }

////new experimental method
// fetch("https://www.course-api.com/react-useReducer-cart-project")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

//mongodb creds aong aong123
