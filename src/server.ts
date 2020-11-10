import app from './app';
require('dotenv').config();

const port: number = Number(process.env.PORT) || 3001;

const server = new app()
  .Start(port)
  .then((serverPort) => console.log(`Server is running at port ${serverPort}`))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

export default server;
