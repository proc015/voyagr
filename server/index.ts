import express from 'express';
import router from './router';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3000, () => {
  console.log(`T-minus 3000 to launch`);
});
