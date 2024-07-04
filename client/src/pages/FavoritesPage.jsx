import { useContext, useState, useEffect } from "react";
import AccountNav from "../AccountNav";
import { UserContext } from "../UserContext";
import { Link, Navigate } from "react-router-dom";
import PlaceImg from "../PlaceImg";
import axios from "axios"; 

export default function FavoritesPage() {
    const { user } = useContext(UserContext);
    const [places, setPlaces] = useState([]);
    const [favorites, setFavorites] = useState([]);


   

    useEffect(() => {
        const fetchFavoritesAndPlaces = async () => {
            if (!user) {
                return <Navigate to={'/login'} />;
            }

            try {
                const response = await axios.get('/favorites');
                setFavorites(response.data);

                const placesData = await Promise.all(
                    response.data.map(async favorite => {
                        const placeResponse = await axios.get('/places/' + favorite);
                        return placeResponse.data;
                    })
                );
                setPlaces(placesData);
            } catch (error) {
                console.error("Error fetching favorites or places:", error);
            }
        };

        fetchFavoritesAndPlaces();
    }, [user]);

    return (
        <div>
            <AccountNav />
            {places.length > 0 &&
                places.map(place => (
                    <Link key={place._id} to={'/place/' + place._id} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-2">
                        <div className="w-48">
                            <PlaceImg place={place} />
                        </div>
                        <div className="py-3 w-full">
                            <div className=" flex justify-between">
                                <h2 className="text-xl font-semibold mr-20"> {place.title} </h2>

                                <div className="flex mt-1 mr-5">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <div className="">
                                            {index > place.averageRating && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                </svg>
                                            )}

                                            {index <= place.averageRating && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                                                </svg>

                                            )}
                                        </div>
                                    ))}


                                </div>
                            </div>
                            
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" />
                                    <path d="M9 4v13" />
                                    <path d="M15 7v13" />
                                </svg>
                                <div className="ml-1">{place.address}</div>
                            </div>
                            <div className="font-light">
                                {place.maxGuests} guests · {place.bedrooms} bedrooms · {place.bathrooms} bathrooms
                            </div>
                            
                           

                            
                            <div className="underline font-medium">
                                ${place.price} per night
                            </div>
                        </div>
                    </Link>
                ))}
        </div>
    );
}
