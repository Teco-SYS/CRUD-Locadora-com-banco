const express = require("express")
const router = express.Router()

const diretorController = require("../controllers/diretorController")

router.get("/", diretorController.getAllDiretor)
router.post("/", diretorController.createDiretor)

module.exports = router