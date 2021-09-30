const express = require("express");
const middleware = require("../helpers/middlewareCompose");
const socketIO = require("socket.io");
const http = require("http");
const Socket = require("./socketsio");
const auth = require("../routes/auth");
const passwords = require("../routes/passwords");

class Server {
    #port = process.env.PORT || 8000;
    #app = express();
    #server = http.createServer(this.#app);
    #io = socketIO(this.#server);

    #middlewares = () => {
        this.#app.use(middleware());
        new Socket(this.#io);
    };

    #routes = () => {
        this.#app.use("/auth", auth);
        this.#app.use("/password", passwords);
        this.#app.all("*", (req, res) => {
            res.statusCode = 404;
            res.json({
                "status": "error",
                "code": 25,
                "message": "Route not found"
            });
        });
    };

    #errorsMiddleware = () => {
        this.#app.use((err, req, res, next) => {
            res.json(err);
        });
    };

    start() {
        this.#middlewares();
        this.#routes();
        this.#errorsMiddleware();
        this.#app.get("/", (req, res, next) => {
            res.send("Texto random");
        });
        this.#app.listen(this.#port, () => {
            console.log("Server is ready on http://localhost:8000");
        });
    }
}

module.exports = Server;