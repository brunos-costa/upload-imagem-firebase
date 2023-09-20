  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBCnm-2DJ5T2KzqENZneCaWK8NASkjDUzg",
    authDomain: "imagem-database.firebaseapp.com",
    projectId: "imagem-database",
    storageBucket: "imagem-database.appspot.com",
    messagingSenderId: "96613531537",
    appId: "1:96613531537:web:fec3c90379e87e36136430"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app)