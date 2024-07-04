import { useState } from "react";
import Image from "./Image";

export default function PlaceGallery({place}) {
    
    const [showPhotos, setShowPhotos] = useState(false);

    if (showPhotos) {
        return (
            <div className="w-full h-full bg-white inset-0 z-50">

        
            <div className="fixed inset-0 bg-white z-50 h-full overflow-y-auto px-20">
                <div className="relative p-8 grid gap-4">
                    <h1 className="text-3xl"> {place.title} </h1>
                    <div className="fixed bg-white border-black">
                        <button onClick={() => setShowPhotos(false)} className="fixed top-3 left-3 flex gap-1 py-2 px-4 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div>
                            <Image className="" src={photo} />
                        </div>
                    ))}
                </div>


            </div>
            </div>
    )
                    }

    return(
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div className="">
                    {place.photos?.[0] && (
                        <div>
                            <Image onClick={() => setShowPhotos(true)} className="cursor-pointer aspect-square object-cover" src={place.photos[0]} />
                        </div>
                    )}
                </div>

                <div className="grid">
                    {place.photos?.[1] && (
                        <Image onClick={() => setShowPhotos(true)} className="cursor-pointer aspect-square object-cover" src={place.photos[1]} />
                    )}
                    <div className="overflow-hidden">
                        {place.photos?.[2] && (
                            <Image onClick={() => setShowPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={place.photos[2]} />
                        )}
                    </div>

                </div>
            </div>
            <button onClick={() => setShowPhotos(true)} className= "absolute bottom-3 right-3 bg-white p-2 flex gap-1 rounded-3xl shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                </svg>

                Show more Photos
            </button>
        </div>
    );

}