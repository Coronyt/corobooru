import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

const Login = () => {

    // Initializing local state vars
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Hooking into login logic states
    const {login, error, pending} = useLogin();

    const submit = async (e) => {
        e.preventDefault();
        await login(username, password); // TODO - Make sure the username input isn't case-sensitive
    }

    return (
        <div> {/* TODO - Need to change form elements to use more semantic HTML attributes (best practice) */}
            <div className="auth content">
                <form onSubmit={submit}>
                    <h3>Login to your account</h3>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button disabled={pending}>Login</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
}
 
export default Login;