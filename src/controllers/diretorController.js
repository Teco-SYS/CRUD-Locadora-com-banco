const DiretorModel = require("../models/DiretorModel")

const diretorController = {
    async getAllDiretor(req, res) {
        const diretor = await DiretorModel.findAll()

        return res.json(diretor)
    },

    async createDiretor(req, res) {
        const { nome } = req.body

        const diretor = await DiretorModel.create({
            nome
        })

        return res.status(201).json(diretor)
    }
}

module.exports = diretorController