import AccountNav from "../AccountNav";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import {Link, Navigate} from "react-router-dom";
import { UserContext } from "../UserContext";



export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [comment, setComment] = useState('');
    
    const {user} = useContext(UserContext)


    if (!user) {
        return <Navigate to={'/login'} />;
    }

    useEffect(() => {
        axios.get('/booking').then(response => {
            setBookings(response.data)
          
        })
    }, []);

    return (
        <div>
            <AccountNav/> 
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    
                    <Link to = {'/account/bookings/' + booking._id}  className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-2">       
                        <div className="w-48">
                            <PlaceImg place = {booking.place} />
                        </div>
                        <div className="py-3">
                            <h2 className="text-xl"> {booking.place.title} </h2>
                            <div className="mt-2 py-2 flex text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                                {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights:
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 icon icon-tabler icon-tabler-calendar-month" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12l14 0" />
                                    <path d="M15 16l4 -4" />
                                    <path d="M15 8l4 4" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-month" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
                            <div className="text-xl flex gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                </svg>

                                Total Price: ${booking.price}
                            </div>
                        </div>                    
                    </Link>
                ))}
            </div>
        </div>
    )
}