const GeneroModel = require("../models/GeneroModel")

const GeneroController = {
    async getAllGeneros(req, res) {
        const generos = await GeneroModel.findAll()

        return res.json(generos)
    }
}

module.exports = GeneroController