class Aluno {
    constructor(id, nome, idade, curso, notaFinal) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}`;
    }
}

let alunos = [];
let nextId = 1;

// Elementos do formulário
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cursoSelect = document.getElementById("curso");
const notaFinalInput = document.getElementById("notaFinal");
const alunoIdInput = document.getElementById("alunoId");
const cadastrarBtn = document.getElementById("cadastrarBtn");

// Elementos da tabela
const alunosTbody = document.getElementById("alunosTbody");

// Elementos de relatórios
const relatoriosDiv = document.getElementById("relatorios");
const resultadoRelatorio = document.getElementById("resultadoRelatorio");

// Funções
function cadastrarAluno() {
    const nome = nomeInput.value;
    const idade = parseInt(idadeInput.value);
    const curso = cursoSelect.value;
    const notaFinal = parseFloat(notaFinalInput.value);
    const alunoId = alunoIdInput.value;

    if (alunoId) {
        const index = alunos.findIndex(aluno => aluno.id === parseInt(alunoId));
        if (index !== -1) {
            alunos[index] = new Aluno(parseInt(alunoId), nome, idade, curso, notaFinal);
            alunoIdInput.value = "";
            alert(`Aluno(a) ${nome} editado(a) com sucesso!`);
        } else {
            const novoAluno = new Aluno(nextId++, nome, idade, curso, notaFinal);
            alunos.push(novoAluno);
            alert(`Aluno(a) ${nome} cadastrado(a) com sucesso!`);
        }

        limparFormulario();
        renderizarTabela();
    }

    function editarAluno(id) {
        const aluno = alunos.find(aluno => aluno.id === id);
        if (aluno) {
            nomeInput.value = aluno.nome;
            idadeInput.value = aluno.idade;
            cursoSelect.value = aluno.curso;
            notaFinalInput.value = aluno.notaFinal;
            alunoIdInput.value = aluno.id;
        }
    }

    function excluirAluno(id) {
        const alunoExcluido = alunos.find(aluno => aluno.id === id);
        alunos = alunos.filter(aluno => aluno.id !== id);
        renderizarTabela();
        if (alunoExcluido) {
            alert(`Aluno(a) ${alunoExcluido.nome} excluído(a) com sucesso!`);
        }
    }

    function renderizarTabela() {
        alunosTbody.innerHTML = "";

        alunos.forEach(aluno => {
            const row = alunosTbody.insertRow();
            row.insertCell().textContent = aluno.nome;
            row.insertCell().textContent = aluno.idade;
            row.insertCell().textContent = aluno.curso;
            row.insertCell().textContent = aluno.notaFinal;

            const actionsCell = row.insertCell();
            const editarButton = document.createElement("button");
            editarButton.textContent = "Editar";
            editarButton.addEventListener('click', function() {
                editarAluno(aluno.id);
            });
            actionsCell.appendChild(editarButton);

            const excluirButton = document.createElement("button");
            excluirButton.textContent = "Excluir";
            excluirButton.addEventListener('click', () => excluirAluno(aluno.id));
            actionsCell.appendChild(excluirButton);
        });
    }

    function limparFormulario() {
        document.querySelector("form").reset();
        alunoIdInput.value = "";
    }

    function listarAprovados() {
        const aprovados = alunos.filter(aluno => aluno.isAprovado());
        exibirResultado(aprovados.map(aluno => aluno.toString()).join("<br>"));
    }

    function calcularMediaNotas() {
        if (alunos.length === 0) {
            exibirResultado("Nenhum aluno cadastrado.");
            return;
        }
        const somaNotas = alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0);
        const media = somaNotas / alunos.length;
        exibirResultado(`Média das notas: ${media.toFixed(2)}`);
    }

    function calcularMediaIdades() {
        if (alunos.length === 0) {
            exibirResultado("Nenhum aluno cadastrado.");
            return;
        }
        const somaIdades = alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
        const media = somaIdades / alunos.length;
        exibirResultado(`Média das idades: ${media.toFixed(2)}`);
    }

    function listarNomesOrdenados() {
        const nomes = alunos.map(aluno => aluno.nome).sort();
        exibirResultado(nomes.join("<br>"));
    }

    function quantidadeAlunosPorCurso() {
        const quantidadePorCurso = alunos.reduce((acc, aluno) => {
            acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
            return acc;
        }, {});

        let resultado = "";
        for (const curso in quantidadePorCurso) {
            resultado += `${curso}: ${quantidadePorCurso[curso]}<br>`;
        }
        exibirResultado(resultado);
    }

    function exibirResultado(mensagem) {
        resultadoRelatorio.innerHTML = mensagem;
    }

    // Event listeners
    cadastrarBtn.addEventListener('click', cadastrarAluno);

    renderizarTabela();
