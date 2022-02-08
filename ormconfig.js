module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
};
