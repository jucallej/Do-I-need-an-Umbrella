import createError from 'http-errors';
import express, { Response, Request } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sassMiddleware from 'node-sass-middleware';
import fs from 'fs';
require('express-async-errors');

const getAllControllers = () => {
    const fromDir = (startPath: string, filter: RegExp): string[] => {
        let filesFound: string[] = [];

        if (fs.existsSync(startPath)) {
            const files = fs.readdirSync(startPath);

            files.forEach(file => {
                const filename = path.join(startPath, file);
                const stat = fs.lstatSync(filename);

                if (stat.isDirectory()) {
                    filesFound = filesFound.concat(fromDir(filename, filter));
                } else if (filename.match(filter)) {
                    filesFound.push(filename);
                }
            });
        }

        return filesFound;
    };

    const startPath = './api';
    const filter = new RegExp('/controller/[^/]*\\.ts');
    return fromDir(startPath, filter);
};

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
    })
);
app.use(express.static(path.join(__dirname, 'public')));

// setting the controllers
getAllControllers().forEach(controllerPath => {
    const controller = require(`./${controllerPath}`).default;
    app.use('/api', controller);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(
    (err: { message: string; status: number }, req: Request, res: Response) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }
);

export default app;
