const Database = require("../app/database");
const bcrypt = require("bcrypt");
const {salt} = require("../app/config");
const {v4} = require("uuid");


class UserRepository {
    #connection;
    indice = "users";

    constructor() {
        this.#connection = new Database(this.indice);
    }

    async findUserByNickname(username, password) {
        try {
            const result = await this.#connection.getOne({
                bool: {
                    must: [
                        {
                            match: {
                                "nickname": username
                            }
                        }
                    ]
                }
            });
            const validateHash = await bcrypt.compare(password, result.password);

            if (!validateHash) {
                return "wrong";
            }
            return result;
        } catch (e) {
            return "server down";
        }
    }

    async createUser(username, password) {

        const user = await this.#connection.getOne({
            bool: {
                must: [
                    {
                        match: {
                            "nickname": username
                        }
                    }
                ]
            }
        });

        if (user) {
            throw "User already exist.";
        }

        try {
            const hSalt = await bcrypt.genSalt(salt);
            const hashedPassword = await bcrypt.hash(password, hSalt);
            await this.#connection.insertOne({
                uuid: v4(),
                nickname: username,
                password: hashedPassword
            });
        } catch (e) {
            console.log(e);
            console.log(e.text);
        }
    }
}

module.exports = {UserRepository};