const filmeModel = require("../models/FilmeModel")

const filmeController = {
    async getAllFilmes (REQ, RES) {
        const filmes = await filmeModel.getAllFilmes()

        return resizeBy.json(filmes)
    },

    async createFilme(req, res) {
        const {
            titulo,
            diretorId,
            generos
        } = req.body

        const filme = {
            titulo,
            diretorId
        }

        const filmeId = await filmeModel.create(filme, generos)

        return res.status(201).json({ id: filmeId })
    }
}

module.exports = filmeController