import {app, db} from "./config_firebase.js"
import { getFirestore, collection, addDoc, getDocs,query, orderBy, doc, deleteDoc, where, documentId, updateDoc  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

let imagem = document.querySelector("#arquivo")
let btnEnviar = document.querySelector("#btnEnviar")
let blocoImagens = document.querySelector("#blocoImagens")
let btnCarregar = document.querySelector("#btnCarregar")