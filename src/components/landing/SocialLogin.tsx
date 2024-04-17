import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "firebaseApp";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function SocialLogin() {
  const onClickSocailLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;
    const name = button.name;
    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    if (name === "github") {
      provider = new GithubAuthProvider();
    }

    const auth = getAuth(app);

    try {
      const result = await signInWithPopup(
        auth,
        provider as GoogleAuthProvider | GithubAuthProvider
      );
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="social-login">
      <button type="button" name="google" onClick={onClickSocailLogin}>
        <FcGoogle />
        Sign up with Google
      </button>
      <button type="button" name="github" onClick={onClickSocailLogin}>
        <FaGithub />
        Sign up with Github
      </button>
    </div>
  );
}
