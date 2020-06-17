import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import helmet from 'helmet';

const environment = process.env.NODE_ENV || 'production';
const port = process.env.PORT || 8080;

const isDevelopment = environment === 'development';
// Always use UTC Timezone
process.env.TZ = 'Etc/UTC';


// Error handler
const handleError = (err, req, res, next) => {
  console.error(err);
  const response = {
    code: err.status || 500,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  };
  console.log(JSON.stringify(response, null, 2));

  if (!isDevelopment) {
    // Non-development environment should not save stack
    delete response.stack;
  }

  res.status(err.status || 500);
  res.json(response);
};

const app = express();

app.set('trust proxy', true);
app.set('view engine', 'jade');
app.use(helmet());
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', (_, res) => res.send('ok'));
app.use(handleError);

const httpServer = http.createServer(app);

httpServer.listen(port, '0.0.0.0', () => {
  console.log(`Server (${environment}) listening on port ${port}`);
});
