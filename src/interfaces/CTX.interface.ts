import { Connection } from "typeorm";
import { Context } from "koa";

export interface CTX extends Context {
    db: Connection
}