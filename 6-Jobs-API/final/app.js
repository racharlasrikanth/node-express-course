require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load("./swagger.yaml");

const express = require('express');
const app = express();

// connect DB
const connectDB = require('./db/connect');
const authenticateUser = require('./middlewares/authentication');


// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handlers
const notFoundErrorMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

// this is for (if we deploy in heroku)
app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
    res.send('<h1>Jobs API</h1><a href="/api-docs">Api Documentation</a>')
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundErrorMiddleware);
app.use(errorHandlerMiddleware);


const PORT = process.env.PORT || 7000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('CONNECTED TO DB...');
        app.listen(PORT, () => {
            console.log(`Server Listening at port: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();