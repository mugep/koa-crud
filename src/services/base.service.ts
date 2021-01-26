import { Repository, DeepPartial } from 'typeorm'

export class BaseService<T>{
    readonly repo: Repository<T>

    constructor(repo: Repository<T>) {
        this.repo = repo
    }

    async getData(): Promise<Array<Partial<T>>> {
        return await this.repo.find()
    }

    async getById(id: number): Promise<T> {
        return this.repo.findOneOrFail(id)
    }

    async create(data: DeepPartial<T>): Promise<T> {
        const entity: DeepPartial<T> = this.repo.create(data)
        console.log(entity);
        return this.repo.save(entity);
    }

    async update(id: number, body: DeepPartial<T>): Promise<T> {
        await this.repo.update(id, body)
        return this.getById(id)
    }

    async del(id: number): Promise<T> {
        const entity = await this.getById(id)
        await this.repo.delete(id)
        return entity
    }
}