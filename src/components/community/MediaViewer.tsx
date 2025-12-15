import { useState, useEffect } from "react";
import { FaDownload, FaChevronLeft, FaChevronRight, FaFilePdf } from "react-icons/fa";
import { type CommunityPost } from "./types";
import { useDownloadPost } from "../../api/hooks/posts";
import client from "../../api/client";

interface MediaViewerProps {
    post: CommunityPost;
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

const MediaViewer = ({ post, initialIndex, isOpen, onClose }: MediaViewerProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [downloading, setDownloading] = useState(false);
    const { mutate: downloadPost } = useDownloadPost();

    // Combine all media types
    const mediaItems = [
        ...(post.imageUrls && post.imageUrls.length > 0 ? post.imageUrls : (post.imageUrl ? [post.imageUrl] : [])).map(url => ({ type: 'image' as const, url })),
        ...(post.videoUrls || []).map(url => ({ type: 'video' as const, url })),
        ...(post.pdfUrls || []).map(pdf => ({ type: 'pdf' as const, url: pdf.url, title: pdf.title }))
    ];

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex, isOpen]);

    // Key event listeners for navigation and close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, currentIndex, mediaItems.length]);

    if (!isOpen || mediaItems.length === 0) return null;

    const currentItem = mediaItems[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    };

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (downloading) return;
        setDownloading(true);

        try {
            console.log("Attempting to download via client:", currentItem.url);

            const response = await client.get(currentItem.url, {
                responseType: 'blob'
            });

            const blob = new Blob([response.data]);
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `Post-${post.id}-${currentIndex + 1}.jpg`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);

            // Successfully downloaded
            downloadPost(post.id.toString());
        } catch (err) {
            console.error("Download failed via client (likely CORS/Auth). Falling back to direct link.", err);
            // Fallback
            const link = document.createElement("a");
            link.href = currentItem.url;
            link.download = `Post-${post.id}-${currentIndex + 1}.jpg`;
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Assume success for fallback
            downloadPost(post.id.toString());
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>

            {/* Controls: Close & Download (Top Right) */}
            <div className="absolute top-20 right-6 flex items-center space-x-4 z-[10000] pointer-events-auto">
                <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-full text-white transition shadow-[0_0_15px_rgba(22,163,74,0.5)] font-bold border-2 border-white/20"
                    title="Download this image"
                >
                    {downloading ? (
                        <div className="w-4 h-4 border-1 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <FaDownload className="w-5 h-5 drop-shadow-md" />
                    )}
                    {/* <span className="drop-shadow-md">Download</span> */}
                </button>
                {/* <button
                    onClick={onClose}
                    className="p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition backdrop-blur-md border border-white/10"
                >
                    <FaTimes className="w-6 h-6" />
                </button> */}
            </div>

            {/* Main Content */}
            <div className="relative w-full h-full p-4 flex items-center justify-center pointer-events-none">
                <div className="pointer-events-auto max-w-full max-h-full">
                    {currentItem.type === 'image' && (
                        <img
                            src={currentItem.url}
                            alt={`View ${currentIndex + 1}`}
                            className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl"
                        />
                    )}
                    {currentItem.type === 'video' && (
                        <div className="w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                            <iframe
                                src={currentItem.url}
                                className="w-full h-full"
                                title="Video player"
                                allowFullScreen
                            />
                        </div>
                    )}
                    {currentItem.type === 'pdf' && (
                        <div className="bg-white p-12 rounded-lg shadow-2xl text-center min-w-[300px]">
                            <FaFilePdf className="w-24 h-24 text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{(currentItem as any).title || "Document"}</h3>
                            <p className="text-gray-500 mb-6">PDF Document</p>
                            <a
                                href={currentItem.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                            >
                                Open in New Tab
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Arrows (if multiple) */}
            {mediaItems.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="absolute left-4 sm:left-40 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition backdrop-blur-md z-50 focus:outline-none"
                    >
                        <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="absolute right-4 sm:right-40 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition backdrop-blur-md z-50 focus:outline-none"
                    >
                        <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </button>

                    {/* Thumbnails / Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-50">
                        {mediaItems.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white scale-125" : "bg-white/40"}`}
                            />
                        ))}
                    </div>
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium z-40">
                        {currentIndex + 1} / {mediaItems.length}
                    </div>
                </>
            )}
        </div>
    );
};

export default MediaViewer;
