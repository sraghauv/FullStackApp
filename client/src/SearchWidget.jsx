import { useState, useEffect } from "react"
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function SearchBar() {
    const [showLocSearch, setLocSearch] = useState(false);
    const [showGuestBar, setShowGuestBar] = useState(false);
    const [location, setLocation] = useState('');
    const [guests, setGuests] = useState();
    const [redirect, setRedirect] = useState(false);

    function handleLocationSearch(ev) {
        ev.preventDefault();
        setLocSearch(!showLocSearch)
        if(showGuestBar) {
            setShowGuestBar(false);
        }
    }

    function handleGuests(ev) {
        ev.preventDefault();
        setShowGuestBar(!showGuestBar)
        if(showLocSearch) {
            setLocSearch(false);
        }
    }

    function changeLocation(ev, loc) {
        ev.preventDefault();
        setLocation(loc);
    }

    function subtractGuests(ev) {
        ev.preventDefault();
        if (guests > 0) {
            setGuests(prevGuests => prevGuests - 1);
        }
    }

    function addGuests(ev) {
        ev.preventDefault();
        if (guests < 20) {
            setGuests(prevGuests => prevGuests + 1);
        }
    }


    useEffect(() => {
        axios.get('/filters').then((response => {
            const { data } = response;
            if (data) {
                setLocation(data.region || 'Anywhere');
                setGuests(data.maxGuests?.$gte || 0);
            }

        }))

    }, [])


    async function search(ev) {
        ev.preventDefault();
        setLocSearch(false);
        setShowGuestBar(false);
        const filters = { location, guests };
        try {
            const response = await axios.post('/filters', filters);
            console.log(response.data);
            window.location.reload();  // Refresh the page without adding a question mark
        } catch (error) {
            console.error("Error posting filters:", error);
        }
    }





    return (
        <form  onSubmit={(ev) => search(ev)} className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
            <button className="bg-white" onClick={(ev) => handleLocationSearch(ev)}>{location}</button>
            {showLocSearch && (
                <div className="locationSearch">
                    <h1 className="font-semibold mb-2">Search by region</h1>
                    <div className="grid grid-cols-3 gap-2">

                        <button onClick={(ev) => changeLocation(ev, 'Anywhere')} className="bg-white">
                            <img
                                src="https://vemaps.com/uploads/img/big/wrld-16.jpg"
                                alt="Example Image"
                                className="w-32 h-24 border-gray-200 border-2 rounded-2xl object-cover "
                            />
                            <div>Anywhere</div>
                        </button>
                        <button onClick={(ev) => changeLocation(ev, 'Europe')} className="bg-white">

                            <img
                                src="https://vemaps.com/uploads/img/eu-c-04.png"
                                alt="Example Image"
                                className="w-32 h-24 border-gray-200 border-2 rounded-2xl object-cover "
                            />
                            <div>Europe</div>
                        </button>
                        <button onClick={(ev) => changeLocation(ev, 'North America')} className="bg-white">

                            <img
                                src="https://vemaps.com/uploads/img/big/na-c-04.jpg"
                                alt="Example Image"
                                className="w-32 h-24 border-gray-200 border-2 rounded-2xl object-cover "
                            />
                            <div>North America</div>
                        </button>
                        <button onClick={(ev) => changeLocation(ev, 'Africa')} className="bg-white">

                            <img
                                src="https://vemaps.com/uploads/img/big/af-c-04.jpg"
                                alt="Example Image"
                                className="w-32 h-24 border-gray-200 border-2 rounded-2xl object-cover "
                            />
                            <div>Africa</div>
                        </button>
                        <button onClick={(ev) => changeLocation(ev, 'South America')} className="bg-white">

                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpkRI6xldPqA88qj3ycpCp_uGvduO7XmO6OQ&s"
                                alt="Example Image"
                                className="w-32 h-24 border-gray-200 border-2 rounded-2xl object-cover "
                            />
                            <div>South America</div>
                        </button>
                        <button onClick={(ev) => changeLocation(ev, 'Asia')} className="bg-white">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFM1b1mLnUoioRwil6EXstji4UsFkGldyVXA&s"
                                alt="Example Image"
                                className="w-32 h-24 border-gray-200 border-2 rounded-2xl object-cover "
                            />
                            <div>Asia</div>
                        </button>

                    </div>
                </div>
            )}

            <div className="border-l border-gray-310"> </div>

            <button className="bg-white" onClick={(ev) => handleGuests(ev)}>
                {guests == 0 && (<div>Add Guests</div>)}
                {guests >= 1 && (<div>{guests} guests</div>)}
            </button>

            {showGuestBar && (
                <div className="guestSearch">
                    <div className="flex justify-between">
                        <h1>Guests</h1>
                        <div className="ml-10 flex gap-4">
                            <button onClick={(ev) => subtractGuests(ev)} className="border-gray-100 border-2 bg-white rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12l14 0" />
                                </svg>
                            </button>
                            <div>{guests}</div>
                            <button onClick={(ev) => addGuests(ev)} className="border-gray-100 border-2 bg-white rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 5l0 14" />
                                    <path d="M5 12l14 0" />
                                </svg>

                            </button>

                        </div>


                    </div>

                </div>
            )}


            <button className="bg-primary text-white p-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </form>
    )
}