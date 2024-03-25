import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  return (
    <div className="social-login">
      <button>
        <FcGoogle />
        Sign up with Google
      </button>
      <button>
        <FaGithub />
        Sign up with Github
      </button>
    </div>
  );
}
