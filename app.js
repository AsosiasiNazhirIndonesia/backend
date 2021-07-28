import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routes from './routes';
import {httpContext, contextMiddleware} from 'express-glass';
import InternalServerError from './error/internal_server_error';
import responseUtil from './util/response_util';

const app = express();

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json');
    next();
});

// use it before all route definitions
app.use(cors({origin: ['*']}));

// Middelware
app.use(bodyParser.json());
// for parsing multipart/form-data
app.use(express.static('public'));
app.use(cookieParser());

//handle trace id
app.use(httpContext.middleware);
app.use(contextMiddleware);

app.use('/api', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    responseUtil.fail(res, new InternalServerError('Something went wrong'));
});
  
// error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        code: err.code,
        message: err.message,
        data: {}
    });
});

export default app;

console.log('Executing Server: app.js ...');