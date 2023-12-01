import { server } from "./app.js";
import { settingDotEnvPort } from "./config/config.js";

// inicia el Servidor

const { port } = settingDotEnvPort();
console.log(port);

server.listen(port, console.log(`Server on port ${port}`));
