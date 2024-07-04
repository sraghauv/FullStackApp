import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Image from "../Image";

export default function IndexPage() {
    const {user} = useContext(UserContext);
    const [places, setPlaces] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [favorites, setFavorites] = useState([]);
    
    useEffect(() => {
        if (user) {
            axios.get('/favorites').then(response => {
               
                setFavorites(response.data);
            })
        }
    }, [user]);

    useEffect(() => {
        axios.get('/places').then((response => {
            
            setPlaces(response.data);
        
        }))

    }, [])

    async function addFavorite(event, placeId) {
        
        event.stopPropagation();
        event.preventDefault();
        if (!user) {
            setRedirect(true);
           
        }
        else {
            setFavorites([...favorites, placeId])
            await axios.put('/addFavorites', { placeId })

        }
       
        
    }

    async function removeFavorite(event, placeId) {
        event.stopPropagation();
        event.preventDefault();
        if (!user) {
            setRedirect(true);
           
        }
        else {
            await axios.put('/removeFavorites', { placeId })
            setFavorites(favorites.filter(id => id !== placeId));

        }
      
       
    }

    if (redirect) {
        return <Navigate to= {'/login'}/>
    }


   

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link to={'/place/' + place._id}>
                    <div className="rounded-2xl flex">
                        {place.photos?.[0] && (
                           <div className="relative">
                                <Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} />
                                {favorites.includes(place._id) && (
                                    <button onClick={(event) => removeFavorite(event,place._id)} className=" absolute right-3 top-3 bg-opacity-0 p-2 flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-filled text-primary" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor" />
                                        </svg>
                                    </button>
                                )}

                                {!favorites.includes(place._id) && (
                                    <button onClick={(event) => addFavorite(event, place._id)} className=" absolute right-3 top-3 bg-opacity-0 p-2 flex gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            
                            
                        )}
                    </div>
                    <div className="flex mt-1 justify-between">
                        <h2 className="font-bold truncate mr-3">
                            {place.title} 
                        </h2>
                        <div className="flex text-sm ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star-filled p-1" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" strokeLnecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                            </svg>
                            {place.averageRating.toFixed(2)}
                        </div>
                    </div>
                    <h3 className="text-sm text-gray-500" >
                        {place.address}
                    </h3>
                    <h4 className="text-sm font-thin" >
                        {place.region}
                    </h4>
                    <div className="text-sm mt-2 underline" >
                        <span className="font-black text-md"> ${place.price} </span>  per night
                    </div>

                </Link>
            ))}
        </div>
    );
}