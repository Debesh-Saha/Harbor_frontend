export function getPdfEmbedUrl(link: string) {

    if (link.includes("drive.google.com")) {
        const match = link.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (match && match[1]) {
            return `https://drive.google.com/file/d/${match[1]}/preview`;
        }
    }

    if (link.includes("dropbox.com")) {
        // Convert ?dl=0 to ?raw=1
        return link.replace("?dl=0", "?raw=1");
    }

    return link;
}
