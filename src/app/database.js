const {Client} = require("@elastic/elasticsearch");
require("dotenv").config();

class Database extends Client {

    indice;

    constructor(indice) {
        super({
            node: require("./config").elastic_host,
            auth: {
                username: "elastic",
                password: "password"
            }
        });
        this.indice = indice;

    }


    async getOne(params) {

        const {body: {hits}} = await super.search({
            index: this.indice,
            body: {
                query: {
                    ...params
                }
            }
        });

        if (hits.total.value !== 0) {
            return hits.hits[0]._source;
        }
        return null;
    }

    async findAll(params) {
        const query = {
            index: this.indice,
            body: {
                query: {}
            }
        };
        if (params) {
            query.body.query = params;
        } else {
            query.body.query = {match_all: {}};
        }

        const {body: {hits}} = await super.search(query);

        if (hits.total.value !== 0) {
            return hits.hits;
        }
        return null;
    }

    async insertOne(params) {
        super.index({
            index: this.indice,
            body: {
                ...params
            }
        });
    }
}


module.exports = Database;