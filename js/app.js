let imagem = document.querySelector("#arquivo")
let btnEnviar = document.querySelector("#btnEnviar")
let blocoImagens = document.querySelector("#blocoImagens")
let btnCarregar = document.querySelector("#btnCarregar")

let recebeImagem = ""

let listaImagens = []
const dadosImagem = {
    nomeImagem:"",
    urlImagem:""    
}

function salvarImagem(){
    const arquivo = new FileReader()// para poder tornar o arquivo que foi feito upload apto para ser lido ou executado, precisamos utilizar a classe 'FileReader' que irá "ler" o nosso arquivo
    console.log(imagem.files[0])
    let resultado = arquivo.readAsDataURL(imagem.files[0])// o método readAsDataURL serve para ler o arquivo

    // é preciso adicionar um evento de 'load' para garantir que as informações do arquivo sejam carregadas de forma correta antes de exibir o conteúdo do arquivo que foi feito o upload
    arquivo.addEventListener('load',(e)=>{
        //console.log(e.target.result)

        imgCard.src = e.target.result// imgCard é um id que não precisei criar variável, uma vez que o id é tido como variável global, posso chamar direto

        dadosImagem.urlImagem = e.target.result
        dadosImagem.nomeImagem = imagem.files[0].name

        recebeImagem = JSON.parse(localStorage.getItem("listaImagens"))
        if(recebeImagem == null){
            console.log("Sem nada por enquanto")

            listaImagens.push(dadosImagem)
            
            //localStorage.setItem("listaImagens",JSON.stringify(listaImagens))
        }
        else{

            //listaImagens = recebeImagem

            //listaImagens.push(dadosImagem)            
            //localStorage.setItem("listaImagens",JSON.stringify(listaImagens))

            //console.log(listaImagens)

        }



       

    })
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
          <img src="${itens.urlImagem}" class="card-img-top" alt="..." id="imgCard">
          <div class="card-body">
            <h5 class="card-title">${itens.nomeImagem}</h5>
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

    carregarImagem()

})

