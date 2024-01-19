interface YouTubeVideoInfo {
    success: boolean;
    videoId?: string;
}

export function extractYouTubeVideoId(url: string): YouTubeVideoInfo {
    const regex = /[?&]v=([^#&?]{11})|youtu\.be\/([^#&?]{11})/;

    const match = url.match(regex);

    if (match) {
        const videoId = match[1] || match[2];
        return {
            success: true,
            videoId,
        };
    }

    return {
        success: false,
    };
}