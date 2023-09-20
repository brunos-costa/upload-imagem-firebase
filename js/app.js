import {app, db} from "./config-firebase.js"
import { getFirestore, collection, addDoc, getDocs,query, orderBy, doc, deleteDoc, where, documentId, updateDoc  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, listAll, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";


let imagem = document.querySelector("#arquivo")
let btnEnviar = document.querySelector("#btnEnviar")
let blocoImagens = document.querySelector("#blocoImagens")
let btnCarregar = document.querySelector("#btnCarregar")

let timestamp = new Date().getTime() // para poder ser utilizado como nome da imagem ao salvar no cloud storage.

// Create a root reference
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

function exibirDados(){
    const listRef = ref(storage, "imagem");// buscando pela pasta e acessando todas as imagens dentro
    // Get metadata properties
    listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        console.log(itemRef._location.path_)// pegando o caminho da imagem
        downloadImagem(itemRef._location.path_)// passando o caminho da imagem, algo como 'imagem/1695246689148'
      });
    }).catch((error) => {
      console.log("O seguinte erro ocorreu ao exibir tudo: ", error)
    });
}

async function downloadImagem(imagem){
    const starsRef = ref(storage, imagem);//é preciso passar o caminho da imagem para poder gerar a url correta

    try {
        let resultado = await getDownloadURL(starsRef)
        console.log(resultado)
    } catch (error) {
        // Uma lista completa de códigos de erro está disponível em
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error)
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
    }

   
}

btnEnviar.addEventListener("click", (evento)=>{
    evento.preventDefault()

    store()    

})

btnCarregar.addEventListener("click",(evento)=>{
    evento.preventDefault()

    exibirDados()



})

