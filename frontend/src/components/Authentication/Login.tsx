import {BACKEND_ORIGIN} from "../../tools/Constants";

const googleAuthHref = new URL('/auth/google', BACKEND_ORIGIN).toString();
const githubAuthHref = new URL('/auth/github', BACKEND_ORIGIN).toString();

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = googleAuthHref;
  };

  const handleGitHubLogin = () => {
    window.location.href = githubAuthHref;
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleGitHubLogin}>Login with GitHub</button>
    </div>
  );
};

export default Login;