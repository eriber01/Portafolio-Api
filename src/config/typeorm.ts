//import { createConnection } from "typeorm";

import { DataSource } from "typeorm";
import path from "path";
import { config } from "./config";

console.log(config);


export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: config.host,
  username: config.username,
  password: config.password,
  port: 54320,
  database: config.database,
  entities: [path.join(__dirname, "../entity/**/**.ts")],
  synchronize: true,
  // logging: true,
});
