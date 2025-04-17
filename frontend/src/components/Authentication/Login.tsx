import { getFullUrl } from "../../services/ApiClient";
const googleAuthHref = getFullUrl('auth/google');
const githubAuthHref = getFullUrl('auth/github');

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