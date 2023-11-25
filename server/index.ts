import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(router);
app.use(express.json());
app.use(bodyParser);
app.use(cors());

app.listen(3000, () => {
  console.log(`T-minus 3000 to launch`)
})