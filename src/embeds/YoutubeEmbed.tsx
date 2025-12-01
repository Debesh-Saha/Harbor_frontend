export const YoutubeEmbed = ({ link }: { link: string }) => {
  // Extract video ID from standard, share, or shorts URLs
  const getYoutubeId = (url: string) => {
    try {
      const u = new URL(url);

      if (u.pathname.startsWith("/shorts/")) {
        return u.pathname.split("/shorts/")[1].split("?")[0];
      }

      if (u.searchParams.get("v")) {
        return u.searchParams.get("v");
      }

      if (u.hostname === "youtu.be") {
        return u.pathname.slice(1);
      }

      return null;
    } catch {
      return null;
    }
  };

  const videoId = getYoutubeId(link);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : "";

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden">
      <iframe
        className="w-full h-full"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};
