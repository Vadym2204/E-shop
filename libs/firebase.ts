import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCNz_evqgtJPhLsC39htYALX7Ij67TWcw4",
  authDomain: "e-shop-5929b.firebaseapp.com",
  projectId: "e-shop-5929b",
  storageBucket: "e-shop-5929b.appspot.com",
  messagingSenderId: "3895826552",
  appId: "1:3895826552:web:e65f3901d86a8fdae0b58d"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp