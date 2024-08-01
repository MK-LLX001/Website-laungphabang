// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDw50ejhi7dIPTRkAMzV_-KRnG2NLZP81I",
  authDomain: "website-lpb.firebaseapp.com",
  projectId: "website-lpb",
  storageBucket: "website-lpb.appspot.com",
  messagingSenderId: "309772254845",
  appId: "1:309772254845:web:590a938e6dc84992ef3b14",
  measurementId: "G-5K9ZQG5L51"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//google auth
const provider = new GoogleAuthProvider();

const auth = getAuth();

const authWithGoogle = async () => {
    let user = null; 

    await signInWithPopup(auth,provider)
    .then((result) => {
        user = result.user
    })
    .catch((error) => {
        console.log(error)
    })

    return user;
}
export { authWithGoogle};