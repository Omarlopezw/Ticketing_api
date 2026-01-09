import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ticketing_user",
    password: "ticketing_password", 
    database: "ticketing",
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
