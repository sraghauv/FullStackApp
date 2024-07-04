import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useState, useEffect } from "react";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [region, setRegion] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(1);
    const [bedrooms, setBedrooms] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [rating, setRating] = useState([]);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setName(data.name);
            setTitle(data.title);
            setAddress(data.address);
            setRegion(data.region);
            setAddedPhotos(data.photos);
            setPerks(data.perks);
            setDescription(data.description);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
            setBedrooms(data.bedrooms);
            setBathrooms(data.bathrooms);
        }

        )

    }, [id])



    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">
                {text}
            </h2>
        );
    }

    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm"> {text} </p>
        );
    }



    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>

        );
    }

    async function savePlace(ev) {
        ev.preventDefault();
     
        const placeData = {
            title, address, region,
            addedPhotos, description,
            perks, extraInfo, bedrooms, bathrooms, checkIn,
            checkOut, maxGuests, price
        };

        if (id) {
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);
        }
        else {
            await axios.post('/places', 
                placeData
            );
            setRedirect(true);

        }
    }

    function changeLocation(ev, loc) {
        ev.preventDefault();
        setRegion(loc);
    }


    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    function linkClasses(loc) {
        let classes = '';
        if(region == loc) {
            classes += 'bg-gray-200 border-gray-500 border-2 rounded-2xl '
        }
        else {
            classes ='bg-white'
        }
        
        return classes;
    }


    return (

        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely Apartment" />
                {preInput('Address', 'Address to Location')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                {preInput('Region', 'Region of the World')}
                <div className="flex gap-5">
                     <button onClick={(ev) => changeLocation(ev, 'Europe')} className={linkClasses('Europe')}>
                        <img
                            src="https://vemaps.com/uploads/img/eu-c-04.png"
                            alt="Example Image"
                            className="w-32 h-24 border-gray-200 border-2 rounded-2xl object-cover "
                        />
                        <div>Europe</div>
                    </button>
                    <button onClick={(ev) => changeLocation(ev, 'North America')} className={linkClasses('North America')}>
                        <img
                            src="https://vemaps.com/uploads/img/big/na-c-04.jpg"
                            alt="Example Image"
                            className="w-32 h-24 border-gray-200 border-2 rounded-2xl object-cover "
                        />
                        <div>North America</div>
                    </button>
                    <button onClick={(ev) => changeLocation(ev, 'Africa')} className={linkClasses('Africa')}>

                        <img
                            src="https://vemaps.com/uploads/img/big/af-c-04.jpg"
                            alt="Example Image"
                            className="w-32 h-24 border-gray-200 border-2 rounded-2xl object-cover "
                        />
                        <div>Africa</div>
                    </button>
                    <button onClick={(ev) => changeLocation(ev, 'South America')} className={linkClasses('South America')}>

                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpkRI6xldPqA88qj3ycpCp_uGvduO7XmO6OQ&s"
                            alt="Example Image"
                            className="w-32 h-24 border-gray-200 border-2 rounded-2xl object-cover "
                        />
                        <div>South America</div>
                    </button>
                    <button onClick={(ev) => changeLocation(ev, 'Asia')} className={linkClasses('Asia')}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFM1b1mLnUoioRwil6EXstji4UsFkGldyVXA&s"
                            alt="Example Image"
                            className="w-32 h-24 border-gray-200 border-2 rounded-2xl object-cover "
                        />
                        <div>Asia</div>
                    </button>
                </div>

                {preInput('Photos', 'More = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'Description of Place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('Perks', 'Select all of the Perks')}
                <div className="mt-2 grid gap-2 grid-cols-2 md:grid-col-4 lg:grid-col-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra Info', 'House Rules, etc')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                {preInput('Important Renting Information', 'List the correct information for your listing.')}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-3 gap-1">
                    <div>
                        <h3>Number of Bedrooms</h3>
                        <input type="number" value={bedrooms} onChange={ev => setBedrooms(ev.target.value)} placeholder="1" />
                    </div>
                    <div>
                        <h3>Number of Bathrooms</h3>
                        <input type="number" value={bathrooms} onChange={ev => setBathrooms(ev.target.value)} placeholder="1" />
                    </div>
                    <div>
                        <h3>Max-Number-Of-Guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder="14:00" />
                    </div>

                    <div>
                        <h3>Price per night</h3>
                        <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} placeholder="$100" />
                    </div>

                    <div>
                        <h3>Check-In Time</h3>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="2:00 PM" />
                    </div>
                    <div>
                        <h3>Check-Out Time</h3>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11:00 AM" />
                    </div>
                </div>
                <button className="primary rounded-full">
                    Save
                </button>
            </form>
        </div>
    );
}