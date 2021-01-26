import { type } from 'os'
import {Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { PostsEntity } from './posts.entity'
import { SharedProp } from './sharedProp.entity'

export enum UserType {
    user = 'user',
    admin = 'admin'
}

@Entity({name: 'users'})
export class UsersEntity extends SharedProp {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'first_name', nullable: false})
    firstName: string
    
    @Column({name: 'last_name', nullable: false})
    lastName: string

    @Column({name: 'birth_of_date', nullable: true, type: 'date'})
    birthOfDate: Date

    @Column({unique: true, nullable: false})
    email: string

    @Column({default: UserType.user, enum: UserType, type: 'enum'})
    type: UserType

    @Column({nullable: false})
    password: string

    // @Column({nullable: false})
    // salt: string

    @OneToMany(() => PostsEntity, (post: PostsEntity) => post.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    posts: Array<PostsEntity>

    accessToken?: string
}