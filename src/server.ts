import "dotenv/config";
import express from "express";
import cors from "cors";
import https from "https";
import http from "http";
import siteRoutes from "./routes/site";
import { requestInterceptor } from "./utils/requestIntercepter";
 
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', requestInterceptor)
app.use('/', siteRoutes);

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  }); 
}

const regularServer = http.createServer(app);

if(process.env.NODE_ENV === "production") {
  // TODO: Configurar SSL
  // TODO: rodar o server na port 80 e 443
} else {
  const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000; 
  runServer(serverPort, regularServer);
}
 