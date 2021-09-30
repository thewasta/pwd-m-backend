class Socketsio {
    constructor(io) {
        this.io = io;
    }

    socket() {
        this.io.on("connection", (socket) => {
            console.log("hola mundo");
        });
    }
}

module.exports = Socketsio;