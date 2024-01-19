class Locals {
  static config() {
    return {
      host:
        process.env.NODE_ENV.trim() === 'production'
          ? process.env.APP_DOCKER_HOST
          : process.env.CLIENT_HOST,
      user: process.env.USER,
      secret: process.env.SECRET,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      port: process.env.PORT,
      apiClientId: process.env.API_CLIENT_ID,
    };
  }
}

export default Locals;
