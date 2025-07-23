// PEGA O ELEMENTO DE CAMPO INPUT
let input = document.getElementById("campoInput");
// PEGA O BOTÃO DE ADICIONAR
let btnAdd = document.getElementById("btn-add");
// PEGA A AREA DA DIV PRINCIPAL
let main = document.getElementById("areaLista");
// CRIA UM CONTADOR PARA CONTROLAR O INDICE
let contador = 0;

function addTarefa(){
    
    // PEGA O VALOR DO input 
    let valorInput = input.value;

    if((valorInput !== "") && (valorInput !== null) && (valorInput !== undefined)){

        contador ++;

        // ADICIONA O CONTEUDO DA DIV item DENTRO DA VARIAVEL novoItem
        let novoItem = `<div class="item" id="${contador}">
            <div class="item-icone" onclick="marcarTarefa(${contador})">
            <img id="icone_${contador}" src="img/icone-aberto.png" class="icone-aberto">
            </div>
            <div class="item-nome" onclick="marcarTarefa(${contador})">
                ${valorInput}
            </div>
            <div class="item-botao">
                <button class="botao-deletar" onclick="deletar(${contador})">Deletar 
                <img src="img/icone-deletar.png" class="icone-deletar"> </button>
            </div>
        </div>`;
        
        // ADICIONA O CONTEUDO DENTRO DO HTML
        main.innerHTML += novoItem;

        // LIMPAR O CAMPO
        input.value = "";
        // LIMPA E VOLTA O FOCO PARA O CAMPO PARA CONTINUAR DIGITANDO
        input.focus();
    }
}

// FUNÇÃO DELETAR USANDO O INDICE(contador) COMO PARÂMETRO
function deletar(id){
    var tarefa = document.getElementById(id);
    tarefa.remove();
}

function marcarTarefa(id){
    // PEGA O ITEM ATRAVÉS DO PARÂMETRO 
    var item = document.getElementById(id);
    // PEGA AS CLASSES QUE O ITEM POSSUI
    var classe = item.getAttribute("class");

    // SE A CLASSE TIVER APENAS item E NÃO TIVER O clicado
    if(classe == "item"){
        // ADICIONA clicado AS CLASSES
        item.classList.add("clicado");

        // PEGA O id DO ICONE
        var icone = document.getElementById("icone_" + id);
        // ALTERA O CAMINHO DA IMAGEM PARA COLOCAR O ICONE DE FECHADO
        icone.src = "img/icone-fechado.png";

        // MÉTODO PARA COLOCAR A TAREFA NO FIM DA LISTA QUANDO CLICADA
        item.parentNode.appendChild(item);

    } else{
        // SE O ITEM JA ESTIVER CLICADO, FAZ OS PROCESSOS CONTRARIOS PARA DESMARCAR A TAREFA
        item.classList.remove("clicado");

        var icone = document.getElementById("icone_" + id);
        icone.src = "img/icone-aberto.png";
    }
}

// MÉTODO PARA ADICIONAR USANDO O BOTÃO ENTER
// MÉTODO PADRÃO
input.addEventListener("keyup", function (event){
    if(event.keyCode === 13){
        event.preventDefault();
        // "CLICA" NO BOTÃO QUANDO APERTA ENTER
        btnAdd.click();
    }
})

