import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import DropDownBar from "./DropDownBar";
import SearchWidget from "./SearchWidget";
export default function Header() {
    const { user } = useContext(UserContext);

    return (
        <div className="bg-white ">
            <header className="flex justify-between mb-6 mt-3">
                <Link to={'/'} href="" className="flex text-primary mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className="font-bold text-2xl px-1">airbnb-clone</span>
                </Link>
               <SearchWidget/>
                <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 ">
                   <DropDownBar/>
                    <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 relative top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {!!user && (
                        <div className="relative top-1">
                            {user.name}
                        </div>
                    )}
                </div>

            </header>
            <hr className="mt-4 border-gray-300 grow-1" />
        </div>


    )
}