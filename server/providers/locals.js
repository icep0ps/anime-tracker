class Locals {
  static config() {
    return {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      apiClientId: process.env.API_CLIENT_ID,
    };
  }
}

export default Locals;
