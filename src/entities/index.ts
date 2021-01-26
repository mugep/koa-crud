import * as Koa from 'koa';
import { DefaultContext, DefaultState } from 'koa';
import { createConnection, Connection } from 'typeorm'
import { config } from 'dotenv'
import { PostsEntity } from './posts.entity'
import { UsersEntity } from './users.entity'
import 'colors'
import 'reflect-metadata'

config();

const { DB_HOST, DB_USER, DB_PASS } = process.env
console.log({DB_HOST, DB_USER, DB_PASS});

export const connectDB = async(
    app: Koa<DefaultState, DefaultContext>
    ): Promise<void> => {
    const connection: Connection = await createConnection({
        type: 'mysql',
        username: DB_USER,
        password: DB_PASS,
        host: DB_HOST,
        database: 'koa',
        entities: [PostsEntity, UsersEntity]
    })

    await connection.synchronize(false)
    .then(() => console.log('synchronized! with DB'.green.bold))
    .catch(() => console.error('Faild to sync with DB'.red.bold))
    
    app.context.db = connection
}
