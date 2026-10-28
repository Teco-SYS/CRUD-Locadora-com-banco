const connection = require("../database/connection")

const FilmeModel = {
    async findAll() {
        return await connection("filmes")
    },

    async create(filme, generos) {
        const { titulo, diretorId } = filme

        const insereFilme = await connection("filmes").insert({
            titulo,
            diretor_id: diretorId
        })

        const [filmeId] = insereFilme

        // inserir um relacionamento para o novo filme para cada genero
        if (generos && generos.length > 0) {
            for (const generoId of generos) {
                await connection("filme_generos").insert({
                    filmeId: filmeId,
                    generoId: generoId
                })
            }
        }

        return filmeId
    },

    async findById(id) {
        const filme = await connection("filmes")
            .where({ id })
            .first()

        if (!filme) return null

        const generos = await connection("generos")
            .join("filmes_generos", "generos.id", "filmes_generos.genero_id")
            .where("filmes_generos.filme_id", id)
            .select("generos.id", "generos.nome")

        return {
            ...filme,
            generos
        }
    },

    async search(filtros) {
        const { titulo, diretor, genero } = filtros

        let query = connection("filmes")
            .leftJoin("filmes_generos", "filmes.id", "filmes_generos.filme_id"
                .leftjoin("generos", "generos.id", "filmes_generos.genero_id")
                .select(
                    "filmes.id",
                    "filmes.titulo",
                    "filmes.diretor_id"
                )
                .distinct()
            )
        if (titulo) {
            query = query.where("filmes.titulo", like`%${titulo}%`)
        }

        if (genero) {
            query = query.where("filmes.diretor_id", diretor)
        }

        if (diretor) {
            query = query.where("filmes.diretor_id", diretor)
        }

        return await query
    }
}

module.exports = FilmeModel