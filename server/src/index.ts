require('dotenv').config();
import 'reflect-metadata';

import http from 'http';
import path from 'path';

import session from 'express-session';
import chalk from 'chalk';
import { createConnection } from 'typeorm';
import express, { NextFunction, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createClient } from 'redis';

import { EnhancedRequest } from './@types/EnhancedRequest';
import { SocketIO } from './utils/Socket';

async function main() {
  const PORT = process.env.PORT ?? 8080;
  const app = express();
  const server = http.createServer(app);
  const redis = createClient();
  SocketIO.init(server);

  app.use((req: EnhancedRequest, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL ?? 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });

  app.use(
    session({
      name: 'crid',
      secret: process.env.SESSION_SECRET ?? 'dev',
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: false,
      },
    }),
  );

  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const schema = await buildSchema({
    resolvers: [path.join(__dirname, 'graphql', 'resolvers', '*.js')],
    nullableByDefault: true,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: { req: EnhancedRequest; res: Response }) => ({
      req,
      res,
      redis,
    }),
  });

  await createConnection({
    type: 'postgres',
    url: process.env.PG_URL,
    entities: [path.join(__dirname, 'Models', '*.js')],
    synchronize: true,
    // logging: true,
  });

  apolloServer.applyMiddleware({
    app,
    cors: { credentials: true, origin: process.env.CLIENT_URL },
  });

  app.get('*', (req: EnhancedRequest, res: Response, next: NextFunction) =>
    res.send('here will be the react app'),
  );

  server.listen(PORT, () =>
    console.log(`${chalk.green('[SERVER]')}: Server listening on  port ${PORT}`),
  );
}

main().catch((error) => console.error(error));
