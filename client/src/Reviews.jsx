
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"

export default function Reviews() {
    const { id } = useParams();
    const [reviews, setReviews] = useState(null);
    const [loadingReviews, setLoadingReviews] = useState(true);

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get('/reviews/' + id).then(response => {
            console.log(response.data);
            setReviews(response.data);
            setLoadingReviews(false);
        }).catch(error => {
            console.error("There was an error fetching the reviews:", error);
            setLoadingReviews(false);
        })
    }, [id]);

    if (loadingReviews) return <div>Loading...</div>;

    return (
        <div className="">

            {reviews.length > 0 && (
                <div>
                    <div className="border-t border-gray-300 mt-8 mb-8"></div>
                    <div >
                        <h2 className="text-2xl font-semibold mb-5">
                            {reviews.length} reviews
                        </h2>
                        <div className="grid grid-cols-2 gap-8">
                            {reviews.map(review => (
                                <div className="border rounded-xl p-4 bg-gray-200">
                                    <h1 className="">{review.name}</h1>
                                    <div className="flex">
                                        {[0, 1, 2, 3, 4].map((index) => (
                                            <div className="bg-gray mb-4">
                                                {index >= review.rating && (

                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                                                    </svg>
                                                )}

                                                {index < review.rating && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="15" height="15" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" />
                                                    </svg>
                                                )}

                                            </div>
                                        ))}
                                    </div>
                                    <div>{review.comment} </div>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            )}

        </div>

    )
}