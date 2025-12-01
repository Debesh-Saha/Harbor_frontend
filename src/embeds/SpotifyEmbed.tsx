export const SpotifyEmbed = ({ link }: { link: string }) => {
    return (
        <div className="h-85 overflow-hidden rounded-xl">
            <iframe
                src={`${link.replace("open.spotify.com/track/", "open.spotify.com/embed/track/")}`}
                className="w-full h-100"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </div>
    )
}
