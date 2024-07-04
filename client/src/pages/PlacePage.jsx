import { useParams, Navigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import Reviews from "../Reviews";
import ExtraInfo from "../ExtraInfo";
import PlacePerks from "../PlacePerks";
import ReviewWidget from "../ReviewWidget";
import { useContext } from "react";
import { UserContext } from "../UserContext";



export default function PlacePage() {
    const { id } = useParams();
    const {user} = useContext(UserContext);
    const [place, setPlace] = useState(null);
    const [loadingPlace, setLoadingPlace] = useState(true);
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
        if (!id) {
            return;
        }

        axios.get('/places/' + id).then(response => {
            setPlace(response.data);
            setLoadingPlace(false);
           
        }).catch(error => {
            console.error("There was an error fetching the place data:", error)
            setLoadingPlace(false);
        })
    }, [id]);


    async function addFavorite(event, placeId) {
        if (!user) {
            setRedirect(true);
            return;
        }
      
        setFavorites([...favorites, placeId])
        await axios.put('/addFavorites', { placeId })
    }

    async function removeFavorite(event, placeId) {
        if (!user) {
            setRedirect(true);
            return;
        }
        setFavorites(favorites.filter(id => id !== placeId));
        await axios.put('/removeFavorites', { placeId })
    }

    if (redirect) {
        return <Navigate to={'/login'} />
    }


    if (loadingPlace ) return <div>Loading...</div>;

    if (!place) return <div>No place data found</div>;


    return (

        <div className="-mx-8 px-32 py-8">
            <div className="justify-between flex">
                <h1 className="text-3xl"> {place.title} </h1>
                <div className="mr-12">
                    {favorites.includes(place._id) && (
                        <button onClick={(event) => removeFavorite(event, place._id)} className=" absolute bg-opacity-0 p-2 flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-filled text-primary" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor" />
                            </svg>
                        </button>
                    )}

                    {!favorites.includes(place._id) && (
                        <button onClick={(event) => addFavorite(event, place._id)} className=" absolute bg-opacity-0 p-2 flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                            </svg>
                        </button>
                    )}

                </div>
               
            </div>
           
            <a className="mt-2 mb-2 my-2 flex block font-semibold underline" target="_blank" href={'https://maps.google.com/?q=' + place.address} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {place.address}
            </a>
            <div>
                
                <PlaceGallery place={place} />
            
                <div className="z-0 mt-6 grid grid-cols-[2fr_1fr] gap-6">
                    <div>
                        <div>
                            <h2 className="font-semibold text-2xl">
                                Entire Home in {place.address}
                            </h2>
                            <div className="font-light">
                                {place.maxGuests} guests · {place.bedrooms} bedrooms · {place.bathrooms} bathrooms
                            </div>
                           <ReviewWidget place={place} />
                           <div className="flex mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                </svg>
                                <div className="ml-3">
                                    Hosted By {place.name}
                                    <div className="font-thin">SuperHost | {place.region}</div>
                                </div>
                               
                           
                           </div>
                            <div className="border-t border-gray-300 mt-5 mb-8"></div>
                            

                        </div>
                        <div className="mr-10">
                            <h2 className="font-semibold text-2xl">
                                Description
                            </h2>
                            <p>{place.description}</p>
                        </div>
                    </div>
                    <div>
                        <BookingWidget place={place} />
                    </div>
                </div>

                <div className="border-t border-gray-300 mt-8 mb-8"></div>

                <div className="mt-8 bg-white">
                    <PlacePerks place={place} />
                </div>

              

                <div className="mt-8 bg-white">
                    <Reviews />
                </div>

                <div className="border-t border-gray-300 mt-8 mb-8"></div>

                <ExtraInfo place={place} />
                
            </div>
        </div>
    )
}