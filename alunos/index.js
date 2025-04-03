class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }
    isAprovado() {
        return this.notaFinal >= 7;
    }
}

let alunos = [];

function cadastrarAluno() {
    let nome = document.getElementById("nome");
    let idade = document.getElementById("idade");
    let curso = document.getElementById("curso");
    let nota = document.getElementById("nota");

    if (nome.value && idade.value && curso.value && nota.value) {
        let aluno = new Aluno(nome.value, Number(idade.value), curso.value, Number(nota.value));
        alunos.push(aluno);
        atualizarTabela();
        nome.value = "";
        idade.value = "";
        curso.value = "JavaScript";
        nota.value = "";
    }
}

function atualizarTabela() {
    let tabela = document.getElementById("tabelaAlunos");
    tabela.innerHTML = "";
    alunos.forEach((aluno, index) => {
        let row = `<tr>
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.notaFinal}</td>
            <td>
                <button onclick="editarAluno(${index})">Editar</button>
                <button onclick="excluirAluno(${index})">Excluir</button>
            </td>
        </tr>`;
        tabela.innerHTML += row;
    });
}

function excluirAluno(index) {
    alunos.splice(index, 1);
    atualizarTabela();
}

function editarAluno(index) {
    let aluno = alunos[index];
    document.getElementById("nome").value = aluno.nome;
    document.getElementById("idade").value = aluno.idade;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("nota").value = aluno.notaFinal;

    excluirAluno(index);
}
