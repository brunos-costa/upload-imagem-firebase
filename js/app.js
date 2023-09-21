import {app, db} from "./config-firebase.js"
import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js"
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js"


let imagem = document.querySelector("#arquivo")
let btnEnviar = document.querySelector("#btnEnviar")
let blocoImagens = document.querySelector("#blocoImagens")
let btnCarregar = document.querySelector("#btnCarregar")

let timestamp = new Date().getTime() // para poder ser utilizado como nome da imagem ao salvar no cloud storage.

let dadosImagem = {
    nome:"",
    url: "",
    timestamp: ""
}


const storage = getStorage(app);
const storageRef = ref(storage, `imagem/${timestamp}`);// função ref() recebe a instância de armazenamento storage e uma string que representa o caminho para o local desejado, seria o nome do arquivo lá no storage. Estou salvando dentro de uma pasta chamado 'imagem/' e em seguida



// SALVANDO IMAGEM NO STORAGE E NO LOCALSTORAGE
function store(){
    try {        
        //console.log(imagem.files[0])

        dadosImagem.nome = imagem.files[0].name// salvando o nome da imagem
        let data = new Date(timestamp)// convertendo o timestamp para data e hora
        dadosImagem.timestamp = data.toLocaleString("pt-BR")// alterando a data e hora para o padrão BR

      
            // Fazendo o upload da imagem para o Storage
            uploadBytes(storageRef, imagem.files[0]).then((resultado) => {
                console.log('Upload realizado', resultado);

                // Obtendo a URL de download da imagem
                getDownloadURL(resultado.ref)
                .then((url) => {

                    console.log(url)
                    dadosImagem.url = url

                    localStorage.setItem("dados",JSON.stringify(dadosImagem))

                    cadastrarImagem(dadosImagem)
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
                
            });            
           
               
    } catch (error) {
        console.error("Erro ao criar o documento: ", error);
    }
}

async function cadastrarImagem(dados){
    try {
        const docRef = await addDoc(collection(db, "imagens"), dados);
        //console.log("Document criado com ID: ", docRef.id);
        alert("Imagem cadastrada com sucesso");
        
        //resetar() 


    } catch (e) {
        console.error("Erro ao criar o documento: ", e);
    }
    
    //getDados() // chamando função para atualizar lista de dados ao criar novo contato
}

btnEnviar.addEventListener("click", (evento)=>{
    evento.preventDefault()

    store()    

})

btnCarregar.addEventListener("click",(evento)=>{
    evento.preventDefault()

    exibirDados()
})

