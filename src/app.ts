import * as Koa from 'koa';
import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';
import { UsersController} from './controllers'
import { createKoaServer, useContainer } from 'routing-controllers'
import { connectDB } from './entities'
import { services } from './services'
import { Container } from 'typedi'
import 'reflect-metadata'
import 'colors'
const port = 8000;

const startApp = async () => {
    const app: Koa<DefaultState, DefaultContext> = createKoaServer({
        controllers: [UsersController]
    })
    await connectDB(app)
    services.forEach((service) => {
        Container.set(service, new service(app.context.db))
    })
    useContainer(Container)

    app.listen(port).on('listening', () => {
    console.log(`Listening on port ${port} http://localhost:${port}`.blue.bold);
    
})
}

startApp()