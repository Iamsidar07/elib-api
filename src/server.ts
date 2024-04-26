import { config } from "./config/config";
import { dbConnect } from "./config/db";
import app from "./app";
const startSever = () => {
  const PORT = config.port || 3000;
  dbConnect();
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
};

startSever();

