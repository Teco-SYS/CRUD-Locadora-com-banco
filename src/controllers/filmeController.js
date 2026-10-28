const FilmeModel = require("../models/FilmeModel")
const filmeModel = require("../models/FilmeModel")

const filmeController = {
    async getAllFilmes (req, res) {
        const filmes = await filmeModel.findAll()

        return res.json(filmes)
    },

    async getFilmeById(req, res) {
        const { id } = req.params

        const filme = await FilmeModel.findById(id)

        return res.json(filme)
    },

    async getFilmesByFiltro(req, res){
        const { titulo, diretor, genero} = req.query

        const filmes = await FilmeModel.search({
            titulo,
            genero,
            diretor
        })

        return res.json(filmes)
    },

    async createFilme(req, res) {
        const {
            titulo,
            diretorId,
            generos,
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