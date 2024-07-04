import { Navigate, useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PlaceGallery from "../PlaceGallery";
import { UserContext } from "../UserContext";
import { differenceInCalendarDays, format } from "date-fns";


export default function BookingPage() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [booking, setBooking] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    if (!user) {
        return <Navigate to={'/login'} />;
    }
    
    const [name, setName] = useState(user.name);
    const [update, setUpdate] = useState(false);
    const [reviewId, setReviewId] = useState(null);
    const [confirmCancel, setConfirmCancel] = useState(false);
    const [redirect, setRedirect] = useState(false);

    


    useEffect(() => {
        axios.get('/booking').then(response => {
            const foundBooking = response.data.find(({ _id }) => _id === id)
            if (foundBooking) {
                setBooking(foundBooking);
            }
        })

    }, [id])

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get('/review/' + id).then(response => {
            const data = response.data[0]
            setRating(data.rating);
            setComment(data.comment);
            setUpdate(true);
            setReviewId(data._id);
        })
    }, [id]);


    if (!booking) {
        return '';
    }

    function handleRating(ev, index) {
        ev.preventDefault();
        setRating(index + 1);
    }

    async function saveReview(ev) {
        ev.preventDefault();
        setShowForm(false);
        const placeId = booking.place._id;
        const bookingId = booking._id;
        const reviewData = {
            placeId, bookingId,
            comment, rating, name, reviewId
        }
        if (update) {
            await axios.put('/review', reviewData);
        }
        else {
            await axios.post('/review', reviewData)
        }
    }

    async function cancelBooking() {

        await axios.delete('/booking/' + id)
        setConfirmCancel(false);
        setRedirect(true);
    }

    if(redirect) {
        return <Navigate to={'/account/bookings'}/>
    }

    return (
        <div className="px-32 py-6">
            <h1 className="text-3xl"> {booking.place.title} </h1>
            <a className="mt-2 mb-2 my-2 flex block font-semibold underline" target="_blank" href={'https://maps.google.com/?q=' + booking.place.address} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {booking.place.address}
            </a>
            <PlaceGallery place={booking.place} />
            <div>

                <div className="my-3 border-gray-400 border-2 rounded-2xl p-4 flex justify-between">
                    <div>
                        <div className="flex text-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights:
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 icon icon-tabler icon-tabler-calendar-month" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                                <path d="M16 3v4" />
                                <path d="M8 3v4" />
                                <path d="M4 11h16" />
                                <path d="M7 14h.013" />
                                <path d="M10.01 14h.005" />
                                <path d="M13.01 14h.005" />
                                <path d="M16.015 14h.005" />
                                <path d="M13.015 17h.005" />
                                <path d="M7.01 17h.005" />
                                <path d="M10.01 17h.005" />
                            </svg>
                            {format(new Date(booking.checkIn), 'dd-MM-yyyy')}
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l14 0" />
                                <path d="M15 16l4 -4" />
                                <path d="M15 8l4 4" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-month" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                                <path d="M16 3v4" />
                                <path d="M8 3v4" />
                                <path d="M4 11h16" />
                                <path d="M7 14h.013" />
                                <path d="M10.01 14h.005" />
                                <path d="M13.01 14h.005" />
                                <path d="M16.015 14h.005" />
                                <path d="M13.015 17h.005" />
                                <path d="M7.01 17h.005" />
                                <path d="M10.01 17h.005" />
                            </svg>{format(new Date(booking.checkOut), 'dd-MM-yyyy')}
                        </div>
                        <div className="text-3xl flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                            </svg>

                            Total Price: ${booking.price}
                        </div>

                    </div>
                    <div >
                        <button onClick={() => setConfirmCancel(true)} className="p-4 rounded-2xl bg-gray-300 mt-2">
                            Cancel Booking
                        </button>
                    </div>
                </div>
                <button className="rounded-2xl p-4 bg-primary border-white border-2 w-full text-white" onClick={() => setShowForm(true)}>Leave a review</button>


                {showForm && (

                    <div className="reviewForm">
                        <div className="reviewFormat">
                            <div className="">
                                <form onSubmit={saveReview}>
                                    <div className="flex justify-between">
                                        <h1 className="text-lg">
                                            Write a Review
                                        </h1>
                                        <button onClick={() => setShowForm(false)} className="bg-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="flex">
                                        {[0, 1, 2, 3, 4].map((index) => (
                                            <button
                                                className="bg-white"
                                                key={index}
                                                onClick={(ev) => handleRating(ev, index)}>
                                                {index >= rating && (

                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                    </svg>
                                                )}

                                                {index < rating && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                                                    </svg>
                                                )}

                                            </button>
                                        ))}
                                    </div>
                                    <textarea type="text" value={comment} onChange={ev => setComment(ev.target.value)} placeholder="Leave a Review for Your Booking" />
                                    <button className="primary">
                                        Save
                                    </button>
                                </form>


                            </div>
                        </div>
                    </div>
                )}

                {confirmCancel && (
                    <div className="reviewForm">
                        <div className="reviewFormat">
                            <div className="">
                                <button onClick={cancelBooking} className="bg-primary text-white rounded-2xl p-4 items-center w-full mb-2">
                                    Confirm Cancel Booking
                                </button>
                                <button onClick={() => setConfirmCancel(false)} className="bg-gray-200 rounded-2xl p-4 items-center w-full">
                                    Cancel
                                </button>
                                
                            </div>
                        </div>
                    </div>

                )}


            </div>


        </div>


    );
}