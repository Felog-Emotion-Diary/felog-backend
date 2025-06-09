import express from "express";
import cors from "cors";
import userRouter from './routers/user.router';
import diaryRouter from './routers/diary.router';

const app = express();
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/diaries', diaryRouter); 

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;