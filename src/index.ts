import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import 'reflect-metadata';
import routes from './routes';


const app = express();

// Call midlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Set all  routes from routes folder

app.use('/', routes);
const server = http.createServer(app);

// start our server
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});


