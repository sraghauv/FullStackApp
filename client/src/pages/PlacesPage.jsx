import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";
import { UserContext } from "../UserContext";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    const { user } = useContext(UserContext)


    if (!user) {
        return <Navigate to={'/login'} />;
    }

    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);

        })
    }, []);
     return (
        <div>
            <AccountNav/>
           
                <div className="text-center">
                    
                    <Link className="gap-1 inline-flex bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add new Pages
                    </Link>
                
                </div>
                <div className="mt-4">
                    {places.length > 0 &&  places.map(place => (
                        <Link to={'/account/places/' + place._id} className="flex cursor-pointer gap-4 bg-gray-100 rounded-2xl p-4">
                            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                                    {place.photos.length > 0 && (
                                        <PlaceImg place = {place} />
                                    )}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl ">
                                    {place.title}
                                </h2>
                                <p className="text-sm mt-2">{place.description}</p>
                            </div>    
                        
                        </Link>    
                    ))}
                    
                </div>

        </div>
    )
}