import app from "./src/app";
import { config } from "./src/config/config";
import { dbConnect } from "./src/config/db";

const startSever = () => {
  const PORT = config.port || 3000;
  dbConnect();
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
};

startSever();
