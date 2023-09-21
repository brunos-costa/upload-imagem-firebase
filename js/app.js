import {app, db} from "./config-firebase.js"
import { getFirestore, collection, addDoc, getDocs,query, orderBy, doc, deleteDoc, where, documentId, updateDoc  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";


let imagem = document.querySelector("#arquivo")
let btnEnviar = document.querySelector("#btnEnviar")
let blocoImagens = document.querySelector("#blocoImagens")
let btnCarregar = document.querySelector("#btnCarregar")

let timestamp = new Date().getTime() // para poder ser utilizado como nome da imagem ao salvar no cloud storage.

let imagensUrl = []


const storage = getStorage(app);
const storageRef = ref(storage, `imagem/${timestamp}`);// função ref() recebe a instância de armazenamento storage e uma string que representa o caminho para o local desejado, seria o nome do arquivo lá no storage. Estou salvando dentro de uma pasta chamado 'imagem/' e em seguida


/* SALVANDO NO FIRESTORE */

// REALIZANDO A INSERÇÃO NO BANCO
function store(){
    try {
        
        //console.log(imagem.files[0])

        // Salvando imagem no Cloud Storage
            uploadBytes(storageRef, imagem.files[0]).then((resultado) => {
                console.log('Upload realizado', resultado);
                alert("Upload realizado", resultado);
            });
            
            
  
       
               
    } catch (error) {
        console.error("Erro ao criar o documento: ", error);
    }
}

// FUNÇÃO PARA PODER PEGAR O CAMINHO DE CADA IMAGEM
function exibirDados(){
    const listRef = ref(storage, "imagem");// buscando pela pasta e acessando todas as imagens dentro

    listAll(listRef)
    .then((resultado) => {           
      resultado.items.forEach((itemRef) => {

        //console.log(itemRef._location.path_)// pegando o caminho da imagem
        gerarUrlImagem(itemRef._location.path_)// passando o caminho da imagem, algo como 'imagem/1695246689148'

       
      })
    }).catch((error) => {
      console.log("O seguinte erro ocorreu ao exibir tudo: ", error)
    });

    console.log(imagensUrl)
}

//FUNÇÃO PARA GERAR AS URLS DAS IMAGENS PARA PODER BAIXAR
async function gerarUrlImagem(imagem){       
    const resultado = ref(storage, imagem);//é preciso passar o caminho da imagem para poder gerar a url correta

    getDownloadURL(resultado)
    .then((url) => {
        // Insert url into an <img> tag to "download"
        console.log(url)
        imagensUrl.push(url)// salvando todas as urls em um vetor
        
    })
    .catch((error) => {
        // Uma lista completa de códigos de erro está disponível em
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
        case 'storage/object-not-found':
            // File doesn't exist
            break;
        case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
        case 'storage/canceled':
            // User canceled the upload
            break;

        // ...

        case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
    });

   
}


btnEnviar.addEventListener("click", (evento)=>{
    evento.preventDefault()

    store()    

})

btnCarregar.addEventListener("click",(evento)=>{
    evento.preventDefault()

    exibirDados()
})

