const e = require("express")

const { request, response } = require("../app")

const alunos = require("../models/alunosModels.json")

const todosAlunos = (request, response) => {
    response.status(200).json({
        "mensagem": "Alunos cadastrados na academia:",
        alunos
    })
}

const buscarPorId = (request, response) => {
    try {
        const chamarId = request.params.id
        const acharId = alunos.find(aluno => Id == chamarId)

        if (!acharId) {
            throw new Error("Id não encontrado!")
        }
        response.status(200).json(acharId)
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)

    }
}

const buscarPorNome = (request, response) => {
    try {
        const trazerNome = request.query.nome.tpLowerCase()
        const encontrarNome = alunos.filter(aluno => aluno.nome == trazerNome)

        if (!encontrarNome) {
            throw new Error("Não existe o nome encontrado!")
        }
        response.status(200).json({
            "mensagem": "aluno encontrado!:",
            encontrarNome
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}

const cadastrarAluno = (request, response) => {
    try {
        const pegarBody = request.body
        let novoAluno = {
            Id: (alunos.length) + 1,
            nome: pegarBody.nome,
            sobrenome: pegarBody.sobrenome,
            endereco: pegarBody.endereco,
            telefone: pegarBody.telefone,
            cpf: pegarBody.cpf,
            planos: pegarBody.planos
        }

        alunos.push(novoAluno)

        response.status(201).json({
            "mensagem": "Aluno cadastrado com sucesso!",
            novoAluno
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)

    }
}

const alualizarAluno = (request, response) => {
    try {
        const pegarId = request.params.id
        const pegarBody = request.body

        const alunoEncontrado = alunos.find(aluno => aluno.Id == pegarId)

        const indice = alunos.indexOf(alunoEncontrado)

        pegarBody.matriculaId == pegarId

        alunos.splice(indice, 1, pegarBody)

        if (alunoEncontrado == undefined) {
            throw new Error("Aluno não encontrado, pois a matrícula não existe.")
        }

        response.status(200).json({
            "mensagem": "Dados do aluno atualizado!",
            pegarBody
        })
    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)

    }
}

const excluirAluno = (request, response) => {
    try {
        const pegarId = request.params.id

        const alunoEncontrado = alunos.find(aluno => aluno.Id == pegarId)

        const indice = alunos.indexOf(alunoEncontrado)

        alunos.splice(indice, 1)

        if (alunoEncontrado == undefined) {
            throw new Error("Aluno não encontrado!")
        }

        response.status(200).json({
            "mensagem": "Aluno excluido com sucesso!"
        })

    } catch (error) {
        response.status(500).json({
            message: error.message
        })
        console.log(error)
    }
}


module.exports = {
    todosAlunos,
    buscarPorId,
    buscarPorNome,
    cadastrarAluno,
    alualizarAluno,
    excluirAluno
}