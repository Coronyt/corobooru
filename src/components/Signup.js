import { useSignup } from "../hooks/useSignup";
import { useState } from "react";

const Signup = () => {

    // Initializing local state vars
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState(""); // TODO - Need better validation during signup for usernames (i.e. at least 3 characters, no symbols, etc.)
    const [password, setPassword] = useState("");

    // Hooking into signup logic states
    const {signup, error, pending} = useSignup();

    const submit = async (e) => {
        e.preventDefault();
        await signup(email, username, password);
    }

    return (
        <div> {/* TODO - Need to change form elements to use more semantic HTML attributes (best practice) */}
            <div className="login content"> {/* TODO - Change className to "signup content" after organizing CSS */}
                <form onSubmit={submit}> {/* TODO - Will need to incorporate some kind of email verification / captcha process here */}
                    <h3>Create a new account</h3>
                    <label>Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
                    <button disabled={pending}>Sign up</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
}
 
export default Signup;