export default {
  HOST: "containers-us-west-157.railway.app",
  USER: "root",
  PASSWORD: "rXKYbAfNPCC8cdw3OlnCa",
  DB: "railway",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
