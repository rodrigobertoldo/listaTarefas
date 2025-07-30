
// PEGA O ELEMENTO DE CAMPO INPUT

let input = document.getElementById("campoInput");

// PEGA O BOTÃO DE ADICIONAR
let btnAdd = document.getElementById("btn-add");

// PEGA A AREA DA DIV PRINCIPAL
let main = document.getElementById("areaLista");

// CRIA UM CONTADOR PARA CONTROLAR O INDICE
let contador = 0;

// CRIA O ARRAY PARA ARMAZENAR NO LOCALSTORAGE
let listaTarefas = [];

// CRIA O OBJETO DA TAREF, ADICIONA ELE NO ARRAY E CHAMA A FUNÇÃO DE SALVAR NO LOCAL STORAGE
function addTarefa(){
    
    // PEGA O VALOR DO input 
    let valorInput = input.value;

    // SE O INPUT NÃO FOR VAZIO
    if((valorInput !== "") && (valorInput !== null) && (valorInput !== undefined)){

        // MAIS UMA TAREFA ADICIONADA
        contador ++;

        // CRIAR UM OBJETO DE TAREFA PARA SALVAR NO LOCALSTORAGEM
        const tarefaObj = {
            id: contador,
            texto: valorInput,
            status: "aberta"
        };

        // AQUI ELE SOBE UM NOVO OBJETO DENTRO DA LISTA DE TAREFAS
        // DEPOIS NO COMANDO ELE SOBE TODA A LISTA PARA O LOCALSTORAGE

        // ADICIONAR TAREFA NO ARRAY listaTarefas USANDO O COMANDO push
        listaTarefas.push(tarefaObj);
        console.log(listaTarefas);

        // SALVA TAREFA NO LOCALSTORAGE - CRIAR MÉTODO
        salvarTarefa();

        //  MANDA O PARAMETRO DO OBJETO PARA A FUNÇÃO QUE INSERE O HTML DA NOVA TAREFA
        inserirHTML(tarefaObj);

        // LIMPAR O CAMPO
        input.value = "";
        // LIMPA E VOLTA O FOCO PARA O CAMPO PARA CONTINUAR DIGITANDO
        input.focus();
    }
}

// USADA PARA INSERIR O CONTEUDO HTML DAS TAREFAS
function inserirHTML(tarefaObj){

    // CRIA UMA VARIAVEL PARA ARMAZENAR E TRABALHAR O SRC
    let icone = "img/icone-aberto.png";

    // CRIA UMA VARIAVEL PARA TRABALHAR AS CLASSES DO HTML
    let classeItem = "item";

    // CONTROLE O ICONE E A CLASSE DO ELEMENTO BASEADO NO STATUS DO OBJETO
    if(tarefaObj.status === "em-processo"){
        classeItem += " clicado";
        icone = "img/icone-pontos.png";
    } else if(tarefaObj.status === "fechado"){
        classeItem += " clicado fechado";
        icone = "img/icone-fechado.png";
    }

    console.log(classeItem);

    let novoItem = `<div class="${classeItem}" id="${tarefaObj.id}">
            <div class="item-icone" onclick="marcarTarefa(${tarefaObj.id})">
            <img id="icone_${tarefaObj.id}" src="${icone}" class="icone-aberto">
            </div>
            <div class="item-nome" onclick="marcarTarefa(${tarefaObj.id})">
                ${tarefaObj.texto}
            </div>
            <div class="item-botao">
                <button class="botao-deletar" onclick="deletar(${tarefaObj.id})">
                <span class ="texto-deletar">Deletar</span> 
                <img src="img/icone-deletar.png" class="icone-deletar"> </button>
            </div>
        </div>`;

    main.innerHTML += novoItem;

}

// FUNÇÃO DELETAR USANDO O INDICE(contador) COMO PARÂMETRO
function deletar(id){

    // PEGA A TAREFA NO DOM
    var tarefa = document.getElementById(id);

    // SE RETORNAR UMA tarefa ELE FAZ A OPERAÇÃO
    if(tarefa){
        tarefa.remove();
    }

    listaTarefas = listaTarefas.filter(tarefa => tarefa.id !== id);

    salvarTarefa();
    
}

// FUNÇÃO QUE CONTROLA AS TAREFAS - aberto; em processo; fechada
function marcarTarefa(id){

    // PEGA O ITEM ATRAVÉS DO PARÂMETRO 
    var item = document.getElementById(id);
    // PEGA AS CLASSES QUE O ITEM POSSUI
    var classe = item.getAttribute("class");
    // PEGA O id DO ICONE
    var icone = document.getElementById("icone_" + id);

    // SE A CLASSE TIVER APENAS item E NÃO TIVER O clicado
    if(classe == "item"){
        // ADICIONA clicado AS CLASSES
        item.classList.add("clicado");
        // ALTERA O CAMINHO DA IMAGEM PARA COLOCAR O ICONE DE FECHADO
        icone.src = "img/icone-pontos.png";

        atualizarStatus(id, "em-processo");

        console.log(listaTarefas);

    } else if(classe == "item clicado"){
        // SE O ITEM JA ESTIVER CLICADO, FAZ OS PROCESSOS CONTRARIOS PARA DESMARCAR A TAREFA
        item.classList.add("fechado");

        icone.src = "img/icone-fechado.png";

        // MÉTODO PARA COLOCAR A TAREFA NO FIM DA LISTA QUANDO CLICADA
        item.parentNode.appendChild(item);

        // ATUALIZA O STATUS DO OBJETO
        atualizarStatus(id, "fechado");

    }
    else if(classe == "item clicado fechado"){
        // SE O ITEM JA ESTIVER CLICADO, FAZ OS PROCESSOS CONTRARIOS PARA DESMARCAR A TAREFA
        item.classList.remove("clicado");
        item.classList.remove("fechado");
        //console.log(item.classList);

        icone.src = "img/icone-aberto.png";

        atualizarStatus(id, "aberto");

    }
}

function atualizarStatus(id, novoStatus){
    listaTarefas.forEach(tarefa => {
        if(tarefa.id === id){
            tarefa.status = novoStatus;
        }
    });
    salvarTarefa();
}

// MÉTODO PARA ADICIONAR USANDO O BOTÃO ENTER -- MÉTODO PADRÃO
input.addEventListener("keyup", function (event){
    if(event.keyCode === 13){
        event.preventDefault();
        // "CLICA" NO BOTÃO QUANDO APERTA ENTER
        btnAdd.click();
    }
})

// MÉTODO PARA SALVAR AS TAREFAS NO LOCALSTORAGE - MUITO IMPORTANTE!!
function salvarTarefa(){
    localStorage.setItem("tarefaSalva", JSON.stringify(listaTarefas));
}

window.onload = function(){

    // PEGA A LISTA DE TAREFAS DENTRO DO LOCALSTORAGE
    let tarefasSalvas = localStorage.getItem("tarefaSalva");

    // SE RETORNAR TRUE
    if(tarefasSalvas){

        // USA O JSON PARA TRANSFORMAR NOVAMENTE EM OBJETO
        let lisTarefas = JSON.parse(tarefasSalvas);

        // ELE PASSA OS DADOS QUE ESTAVAM NO LOCALSTORAGE PARA O ARRAY
        // PARA MANTER ATUALIZADO O ARRAY E DESSA FORMA NÃO PERDE OS DADOS
        listaTarefas = lisTarefas;

        // PERCORRE A LISTA DE OBJETPOS
        lisTarefas.forEach(tarefa =>{
            if(tarefa.id > contador){
                contador = tarefa.id;
            }
            inserirHTML(tarefa);
        });
    }

}

