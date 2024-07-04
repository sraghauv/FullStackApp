
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register',
                {
                    name,
                    email,
                    password,
                });
            alert('registration successful. Now you can log in');
        } catch(e){
            alert('Registration failed. Please try again later');
        }

       setRedirect(true);
       
    }

    if(redirect) {
        return <Navigate to ={'/login'}/> 
    }



    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser} >
                    <input type = "text" 
                        placeholder= "John Doe" 
                        value={name} 
                        onChange={ev => setName(ev.target.value)}/>
                    <input type= "email" 
                        placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type= "password" 
                        placeholder="password" 
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className= "primary"> Register </button>
                    <div className="text-center py-2text-gray-500">
                        All Ready a Member?
                        <Link className="px-1 underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )

}