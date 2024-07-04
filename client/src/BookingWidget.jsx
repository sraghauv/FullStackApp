import { useContext, useState, useEffect } from "react";
import {differenceInCalendarDays} from 'date-fns'
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "./UserContext";

export default function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] =  useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user) {
            setName(user.name);
        }
    }, [user]);
    let numberOfNights = 0;
    if(checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        const data = {checkIn, checkOut, numberOfGuests, name, phone, place: place._id, price: numberOfNights * place.price,}
         const response = await axios.post('/booking', data)
         const bookingId = response.data._id;
         setRedirect('/account/bookings/' + bookingId);

    
    }

    if(redirect) {
        return <Navigate to= {redirect} />
    }
    return(
        <div className="bg-white shadow-lg p-4 rounded-2xl border-gray-100 border-2">
            <div className="text-center text-2xl">
                Price: {place.price} per night
            </div>
            <div className="flex p-2 gap-2 ">
                <div className="border p-4 rounded-2xl">
                    <label>Check In: </label>
                    <input type="date" value = {checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                </div>
                <div className="border p-4 rounded-2xl">
                    <label>Check Out: </label>
                    <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                </div>
            </div>
            <div className="border p-4 rounded-2xl">
                <label> Number of Guests: </label>
                <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
            </div>
            {numberOfNights > 0 && (
                <div className="">
                    <label> Your Full Name: </label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                    <label> Phone Number: </label>
                    <input type="phone" value={phone} onChange={ev => setPhone(ev.target.value)} />
                </div>

            )}


            <button onClick ={bookThisPlace} className="mt-4 primary"> 
                Book this place 
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                  )}
             </button>

        </div>
    );
}