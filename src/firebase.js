import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword , getAuth, signInWithEmailAndPassword , signOut} from "firebase/auth";
import { addDoc , collection , getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "hacktoberfest-79de9.firebaseapp.com",
  projectId: "hacktoberfest-79de9",
  storageBucket: "hacktoberfest-79de9.firebasestorage.app",
  messagingSenderId: "634076658995",
  appId: "1:634076658995:web:c6e971c7104b9816515246",
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