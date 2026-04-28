import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "https://health-data-collector-w6c5.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Routes
app.use("/", routes);
app.get("/", (req, res) => {
    res.send("Server is running")
})

export default app;
