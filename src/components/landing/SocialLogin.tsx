import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { app } from "firebaseApp";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function SocialLogin() {
  const onClickSocailLogin = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    const auth = getAuth(app);

    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    if (name === "github") {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(
      auth,
      provider as GoogleAuthProvider | GithubAuthProvider
    )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error?.message;
        toast(errorMessage);
      });
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
