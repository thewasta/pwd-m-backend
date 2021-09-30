const Database = require("../app/database");
const {decrypt, encrypt} = require("../app/crypto");
const {v4} = require("uuid");

class PasswordRepository {
    #connection;
    indice = "passwords";

    constructor() {
        this.#connection = new Database(this.indice);
    }

    async store(uuid, password, domain, title, note) {
        console.log(password);
        const hashedPassword = encrypt(password);

        await this.#connection.insertOne({
            uuid: v4(),
            user_id: uuid,
            password: hashedPassword.password,
            iv: hashedPassword.iv,
            title,
            domain,
            note
        });
    }

    //giving user UUID
    async getAll(userId) {
        const results = await this.#connection.findAll({
            match: {
                user_id: userId
            }
        });
        let value = [];

        results?.map(result => {
            value.push(result._source);
        });
        return value;
    }

    // giving a password UUID
    async findOne(toFind, iv) {

        const result = await this.#connection.getOne({
            match: {
                uuid: toFind
            }
        });
        if (!result) return null;

        return {
            password: decrypt({password: result.password, iv})
        };
    }
}

module.exports = {PasswordRepository};