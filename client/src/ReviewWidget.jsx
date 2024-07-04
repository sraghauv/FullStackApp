import { useState } from "react"

export default function ReviewWidget({ place }) {
    const [rating, setRating] = useState(place.averageRating)


    return (
        <div>


            {rating >= 4 && (
                <div className="reviewDisplay">
                    <div className="flex items-center ml-3 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home-ribbon" width="45" height="45" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M16 15h5v7l-2.5 -1.5l-2.5 1.5z" />
                            <path d="M20 11l-8 -8l-9 9h2v7a2 2 0 0 0 2 2h5" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h1.5" />
                        </svg>
                        <div className="ml-10 text-lg text-center">
                            <div className="font-semibold"> Guest Favorite</div>
                            <div className="">

                                One of the most beloved places on air-bnb clone
                            </div>

                        </div>


                    </div>

                    <div className="flex">
                        <div>
                            <div className="text-center font-semibold text-lg">
                                {place.averageRating.toFixed(2)}
                            </div>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <div className="bg-white">
                                        {index > rating && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                            </svg>
                                        )}

                                        {index <= rating && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star-filled" width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                                            </svg>

                                        )}

                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="mx-5 border-l-2 border-grey-200 h-full"></div>
                        <div className="text-center">
                            <div> {place.rating.length} </div>
                            <div> reviews </div>
                        </div>

                    </div>


                </div>

            )}
        </div>


    )
}