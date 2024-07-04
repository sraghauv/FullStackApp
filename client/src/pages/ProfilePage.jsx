import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import { useContext, useState } from "react";
import axios from 'axios';
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);

    }

    if (!ready) {
        return 'Loading..';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />;
    }



    if (redirect) {
        return <Navigate to={redirect} />;
    }


    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div>
                    <div className="flex items-center justify-center mt-20">
                        <div className="flex flex-col items-center">
                            <div className="text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user justify-self-center w-20 h-20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                </svg>
                            </div>

                            <div className="text-center mt-3">
                                Logged in as {user.name} ({user.email})
                            </div>

                            <button onClick={logout} className="primary max-w-md mt-3">
                                Logout
                            </button>
                        </div>
                    </div>
                    
                    
                </div>


            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}