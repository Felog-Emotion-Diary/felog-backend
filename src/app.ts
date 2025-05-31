import express from "express";
import userRouter from './routers/user.router';

const app = express();
app.use(express.json());

app.use('/api/users', userRouter);

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;