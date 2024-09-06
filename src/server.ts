import express from "express";
import accountRoutes from "./routes/accountRoutes";
const server = express();
const port = 3333;
server.use(express.json());

server.use(accountRoutes);

server.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
