const form = document.querySelector("#formulario");
const lista = document.querySelector(".lista");
const add = document.querySelectorAll(".add");
const tarefa = document.querySelector("#tarefa");
const fText = document.querySelector(".footer_texto");
const textoFooter = document.querySelector(".footer__texto__tarefas");
const spanFooter = document.createElement("span");

const listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

fText.insertBefore(spanFooter, textoFooter);

function atualizaLocalStorage() {
  localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
}

listaTarefas.forEach((elemento) => {
  criarElemento(elemento);
});

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

  let quantidadeDeTarefas = 0;

  listaTarefas.forEach((elemento, index) => {
    if (elemento.checar) {
      lista.innerHTML += `
        <li class="lista__item disable" data-value="${index}">
          <input type="checkbox" class="item__input" checked />
          <p class="item__texto">${elemento.tarefa}</p>
        </li>
      `;
    } else {
      lista.innerHTML += `
        <li class="lista__item" data-value="${index}">
          <input type="checkbox" class="item__input" />
          <p class="item__texto">${elemento.tarefa}</p>
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
    });
  });

  atualizaLocalStorage();
}

add.forEach((elemento) =>
  elemento.addEventListener("click", () => {
    tarefa.focus();
  })
);

function atualizarTarefas(quantidadeDeTarefas) {
  spanFooter.innerText = "";
  spanFooter.innerText = `${quantidadeDeTarefas}`;
}
