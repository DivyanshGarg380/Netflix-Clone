import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword , getAuth, signInWithEmailAndPassword , signOut} from "firebase/auth";
import { addDoc , collection , getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "netflix-clone-9cd21.firebaseapp.com",
  projectId: "netflix-clone-9cd21",
  storageBucket: "netflix-clone-9cd21.firebasestorage.app",
  messagingSenderId: "326032244057",
  appId: "1:326032244057:web:fd0fa53b8fee420b9de048",
  measurementId: "G-295N6NE48P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password) =>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"users"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

    }catch(error){
        console.error(error);
        toast.error(error.code.split('/')[1].replaceAll('-',' '));
    }
}

const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].replaceAll('-',' '));
    }
}

const logout = () =>{
    auth.signOut();
}

export {auth,db,signup,login,logout};