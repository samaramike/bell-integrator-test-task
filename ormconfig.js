const isTs = process.env.TS_ENV === "true"

const SnakeCaseStrategy = require("typeorm-naming-strategy").SnakeCaseStrategy;

module.exports = {
  type: process.env.TYPEORM_DB_TYPE || "postgres",
  host: process.env.TYPEORM_HOST || "localhost",
  port: process.env.TYPEORM_PORT || 5432,
  username: process.env.TYPEORM_USERNAME || "bell",
  database: process.env.TYPEORM_DATABASE || "bell",
  password: process.env.TYPEORM_PASSWORD || "bell",
  synchronize: true,
  logging: process.env.TYPEORM_LOGGING === "true",
  namingStrategy: new SnakeCaseStrategy(),
  cli: {
    migrationsDir: "src/migration",
  },
  entities: isTs ? ["src/**/*.entity.ts"] : ["dist/**/*.entity.js"],
  migrations: isTs ? ["src/migration/*.ts"] : ["dist/migration/*.js"],
  subscribers: isTs
    ? ["src/**/*.subscriber.ts"]
    : ["dist/**/*.subscriber.js"],
}
