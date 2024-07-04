export default function ExtraInfo({place}) {
    return(
        <div>
            <div>
                <div className="">
                    <h2 className="font-semibold text-2xl" >Extra Info</h2>
                </div>
                <div className="mt-1">
                    {place.extraInfo}
                </div>
            </div>
            <div className="border-t border-gray-300 my-8"></div>
            <div>
                <h2 className="font-bold text-2xl">Things to Know</h2>
                <div className="grid grid-cols-3 mt-4">
                    <div className="">
                        <h3 className="font-medium text-lg">
                            House Rules
                        </h3>
                        <div className="font-thin text-md">
                            Check-in after {place.checkIn} <br />
                            Check-out before {place.checkOut} <br />
                            {place.maxGuests} guests maximum
                        </div>
                    </div>
                    <div className="">
                        <h3 className="font-medium text-lg">
                            Safety & Property
                        </h3>
                        <div className="font-thin text-md">
                            Exterior security camers on property<br />
                            Carbon monoxide alarm  <br />
                            Smoke alarm
                        </div>
                    </div>
                    <div className="">
                        <h3 className="font-medium text-lg">
                            Cancellation policy
                        </h3>
                        <div className="font-thin text-md">
                            This reservation is non-refundable. <br />
                            Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.

                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}