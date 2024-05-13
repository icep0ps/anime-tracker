class Locals {
  static config() {
    return {
      host:
        process.env.NODE_ENV.trim() === 'production'
          ? process.env.APP_DOCKER_HOST
          : process.env.CLIENT_HOST,
      user: process.env.DB_USER,
      secret: process.env.SECRET,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      apiClientId: process.env.API_CLIENT_ID,
    };
  }
}

export default Locals;
