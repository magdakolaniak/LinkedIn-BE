import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import experienceRoutes from './experience/index.js';
import listEndpoints from 'express-list-endpoints';
import commentsRouter from './comments/index.js';
import profileRoute from './profile/index.js';
import postRouter from './post/index.js';
import {
  badRequestErrorHandler,
  catchAllErrorHandler,
  forbiddenErrorHandler,
  notFoundErrorHandler,
} from './errorHandlers.js';

const server = express();

const port = process.env.PORT;

server.use(express.json());
server.use(cors());

//EXPERIENCE ROUTE BUSOLA
server.use('/profile', experienceRoutes);

//PROFILE ROUTE ARTUR
//POST ROUTE   MAGDA
server.use('/posts', postRouter);
server.use('/posts', commentsRouter);
server.use('/profile', profileRoute);

server.use(notFoundErrorHandler);
server.use(badRequestErrorHandler);
server.use(forbiddenErrorHandler);
server.use(catchAllErrorHandler);
console.table(listEndpoints(server));

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
