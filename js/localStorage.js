let imagem = document.querySelector("#arquivo")
let btnEnviar = document.querySelector("#btnEnviar")
let blocoImagens = document.querySelector("#blocoImagens")
let btnCarregar = document.querySelector("#btnCarregar")

let listaImagens = []
const dadosImagem = {
    nome:"",
    url:""
}

/* SALVANDO DADOS NO LOCALSTORAGE - LOCALSTORAGE LIMITA A 10MB */
function salvarImagem(){
    
    console.log(imagem.files[0])
   
    
    dadosImagem.url = imagem.files[0]
    dadosImagem.nome = imagem.files[0].name

    let recebeImagem = JSON.parse(localStorage.getItem("listaImagens"))

    if(recebeImagem == null){
        console.log("Sem nada por enquanto")

        listaImagens.push(dadosImagem)
        
        localStorage.setItem("listaImagens",JSON.stringify(listaImagens))
    }
    else{

        listaImagens = recebeImagem

        listaImagens.push(dadosImagem)            
        localStorage.setItem("listaImagens",JSON.stringify(listaImagens))

        console.log(listaImagens)

    }
    // é preciso adicionar um evento de 'load' para garantir que as informações do arquivo sejam carregadas de forma correta antes de exibir o conteúdo do arquivo que foi feito o upload

}
function carregarImagem(){
    
    let listaImagens = JSON.parse(localStorage.getItem("listaImagens"))

    /*

    //console.log(listaImagens)
    */

    
    for(itens of listaImagens){
        console.log(itens)
        let card = document.createElement("div")
        card.classList.add("col")
        card.innerHTML = `

        <div class="card h-100">
          <img src="${itens.url}" class="card-img-top" alt="..." id="imgCard">
          <div class="card-body">
            <h5 class="card-title">${itens.nome}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>

        `
        blocoImagens.appendChild(card)
    }

}


btnEnviar.addEventListener("click", (evento)=>{
    evento.preventDefault()

    salvarImagem()  

})

btnCarregar.addEventListener("click",(evento)=>{
    evento.preventDefault()

   // carregarImagem()

})

