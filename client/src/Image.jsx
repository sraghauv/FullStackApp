export default function Image({src, ...rest}) {
    src = src && src.includes('https://') ? src : import.meta.env.VITE_IMAGE_BASE_URL + '/' + src
    return(
            <img {...rest} src={src} alt={''}/>
    )
}