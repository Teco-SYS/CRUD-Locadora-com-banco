const express = require("express")
const router = express.Router()

const diretorController = require("../controllers/filmeController")

router.get("/", diretorController.getAllFilmes)
router.get("/search", diretorController.getFilmesByFiltro)
router.get("/:id", diretorController.getFilmeById)
router.post("/", diretorController.createFilme)

module.exports = router