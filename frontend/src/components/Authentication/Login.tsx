const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const handleGitHubLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github';
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