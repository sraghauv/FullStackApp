
import { useState, useContext, useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from "./UserContext";
import axios from "axios";

export default function DropDownBar() {
    const [isOpen, setIsOpen] = useState(false);
    const {user, setUser } = useContext(UserContext);
    const dropdownRef = useRef(null);
    let {subpage} = useParams();

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        setIsOpen(false);
        return <Navigate to={'/login'} />;
    }

    function handleToggle(){
        setIsOpen(!isOpen)
    }

    function handleLink() {
        setIsOpen(false);
    }
   

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside, { capture: true });

        return () => {
            document.removeEventListener("mousedown", handleClickOutside, { capture: true });
        };
    }, []);

    return (
        <div ref={dropdownRef} >

            <button onClick={handleToggle} className='bg-white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 relative top-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            {isOpen && !subpage && (
                <div className='dropdownMenu' on onMouseLeave={handleToggle} >
                    <div className='grid grid-cols-1 gap-1 mr-24'>
                        <Link to="/" onClick={handleLink}> Home </Link>
                        <Link to="/account/favorites" onClick={handleLink}> My Favorites</Link>
                        <Link to="/account/bookings" onClick={handleLink}> My Bookings</Link>
                        <hr className="w-32 mt-1" />
                        <Link to="/account/places" onClick={handleLink}> My Listings </Link>
                        <Link to="/account" onClick={handleLink}> Account </Link>
                        <hr className="w-32 mt-1" />
                        {user && (<button onClick={logout} className='bg-white mr-24'>Log out</button>)}
                        {!user && (<Link to="/login" onClick={handleLink} className='bg-white mr-24'>Log In</Link>)}
                    </div>
                   
              
                    
                </div>)}
        </div>
    );
}


