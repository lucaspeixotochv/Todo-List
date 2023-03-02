const form = document.querySelector("#formulario");
const lista = document.querySelector(".lista");
const listaConcluidas = document.querySelector(".concluidas");
const tituloConcluidas = document.querySelector(".titulo_concluidas");
const add = document.querySelector(".add");
const tarefa = document.querySelector("#tarefa");
const fText = document.querySelector(".footer_texto");
const textoFooter = document.querySelector(".footer__texto__tarefas");

const listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function atualizaLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
}

listaTarefas.forEach((elemento) => {
  criarElemento(elemento);
  verificarConcluidas(elemento);
});

criarElemento();
verificarConcluidas();

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const verificacao = listaTarefas.find(
    (elemento) =>
      elemento.tarefa.trim().toUpperCase() === tarefa.value.trim().toUpperCase()
  );

  if (tarefa.value) {
    if (verificacao) {
      alert("Já existe uma tarefa com mesmo nome");
    } else {
      listaTarefas.push({
        tarefa: tarefa.value,
        indice: listaTarefas.length,
        checar: false,
      });

      localStorage.setItem("tarefas", JSON.stringify(listaTarefas));

      criarElemento();

      tarefa.value = "";
    }
  }
});

function criarElemento() {
  lista.innerHTML = "";
  listaConcluidas.innerHTML = "";

  let quantidadeDeTarefas = 0;

  listaTarefas.forEach((elemento, index) => {
    if (elemento.checar) {
      listaConcluidas.innerHTML += `
        <li class="lista__item disable" data-value="${index}">
          <input type="checkbox" class="item__input" checked />
          <p class="item__texto">${elemento.tarefa}</p>
          <span class="material-symbols-outlined">
          close
          </span>
        </li>
      `;
    } else {
      lista.innerHTML += `
        <li class="lista__item" data-value="${index}">
          <input type="checkbox" class="item__input" />
          <p class="item__texto">${elemento.tarefa}</p>
          <span class="material-symbols-outlined">
          close
          </span>
        </li>
      `;
      quantidadeDeTarefas++;
    }
  });

  atualizarTarefas(quantidadeDeTarefas);

  const checkList = document.querySelectorAll(".item__input");

  checkList.forEach((input) => {
    input.addEventListener("click", (evento) => {
      indiceDoElemento = evento.target.parentElement.getAttribute("data-value");
      listaTarefas[indiceDoElemento].checar = evento.target.checked;
      criarElemento();
      verificarConcluidas();
    });
  });
  const remove = document.querySelectorAll(".material-symbols-outlined");

  remove.forEach((icon) => {
    icon.addEventListener("click", (evento) => {
      indiceDoElemento = evento.target.parentElement.getAttribute("data-value");
      listaTarefas.splice(indiceDoElemento, 1);
      criarElemento();
      verificarConcluidas();
    });
  });

  atualizaLocalStorage();
}

add.addEventListener("click", (evento) => {
  evento.preventDefault();
  tarefa.focus();
});

function verificarConcluidas() {
  if (listaConcluidas.children.length > 0) {
    tituloConcluidas.style.display = "block";
  } else {
    tituloConcluidas.style.display = "none";
  }
}

function atualizarTarefas(quantidadeDeTarefas) {
  if (quantidadeDeTarefas > 0) {
    if (quantidadeDeTarefas == 1) {
      textoFooter.innerHTML = `${quantidadeDeTarefas} Tarefa`;
    } else {
      textoFooter.innerHTML = `${quantidadeDeTarefas} Tarefas`;
    }
  } else {
    textoFooter.innerHTML = "Nenhuma tarefa";
  }
}
