import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import postRouter from './post';

const server = express();

const port = process.env.PORT;

server.use(express.json());
server.use(cors());

//EXPERIENCE ROUTE BUSOLA
//PROFILE ROUTE ARTUR
//POST ROUTE   MAGDA
server.use('/posts', postRouter);

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(
    server.listen(port, () => {
      console.log('Running on port', port);
    })
  )
  .catch((err) => console.log(err));