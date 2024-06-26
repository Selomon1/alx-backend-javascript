import express from 'express';
import routes from './routes/index';

const app = express();
app.use(routes);

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
