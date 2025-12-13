import { useState } from "react";
import PostActions from "./PostActions";
import type { CommunityPost } from "./types";
// import { Download, Film, FileText } from 'lucide-react'; 

const CommunityPostCard = ({ post }: { post: CommunityPost }) => {
  const initials = post.author.split(" ").map(n => n[0]).join("");
  const [showComments, setShowComments] = useState(false);

  // data prepare
  // const images = post.imageUrls && post.imageUrls.length > 0 
  //                ? post.imageUrls 
  //                : (post.imageUrl ? [post.imageUrl] : []);
  // const videos = post.videoUrls || []; 
  // const pdfs = post.pdfUrls || [];

  // Fallback URL to display when an image fails to load
  // const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackText: string) => {
  //   e.currentTarget.onerror = null;
  //   e.currentTarget.src = `https://placehold.co/600x400/cccccc/333333?text=${fallbackText}`;
  // };

  // const renderImageGallery = () => {
  //   if (images.length === 0) return null;

  //   const displayImages = images.slice(0, 5);
  //   const imageCount = displayImages.length;
  //   const hasMoreImages = images.length > 5;
  //   const remainingImages = images.length - 5;
    
  //   const imgClasses = "w-full h-full object-cover transform hover:scale-105 transition duration-300 cursor-pointer";

  //   if (imageCount === 1) {
  //       return (
  //            <div className="relative w-full overflow-hidden rounded-xl shadow-md bg-gray-100 flex-1 mb-4">
  //               <img
  //                   src={displayImages[0]}
  //                   alt={`Content by ${post.author}`}
  //                   className="w-full h-80 object-cover"
  //                   onError={(e) => handleImageError(e, "Content Not Available")}
  //               />
  //           </div>
  //       );
  //   }
    
  //   return (
  //     <div className="w-full overflow-hidden rounded-xl shadow-md bg-gray-100 mb-4 relative h-80">
        
  //       {imageCount === 2 && (
  //           <div className="grid grid-cols-2 gap-1 h-full">
  //               {displayImages.map((url, index) => (
  //                   <div key={index} className="overflow-hidden">
  //                       <img src={url} alt={`Image ${index + 1}`} className={imgClasses} onError={(e) => handleImageError(e, `Image ${index + 1}`)}/>
  //                   </div>
  //               ))}
  //           </div>
  //       )}

  //       {imageCount === 3 && (
  //           <div className="grid grid-cols-2 gap-1 h-full">
  //               <div className="col-span-1 row-span-2 overflow-hidden">
  //                   <img src={displayImages[0]} alt="Image 1" className={imgClasses} onError={(e) => handleImageError(e, "Image 1")}/>
  //               </div>
  //               <div className="col-span-1 grid grid-rows-3 gap-1">
  //                   <div className="overflow-hidden"><img src={displayImages[1]} alt="Image 2" className={imgClasses} onError={(e) => handleImageError(e, "Image 2")}/></div>
  //                   <div className="overflow-hidden"><img src={displayImages[2]} alt="Image 3" className={imgClasses} onError={(e) => handleImageError(e, "Image 3")}/></div>
  //               </div>
  //           </div>
  //       )}

  //       {imageCount === 4 && (
  //           <div className="grid grid-cols-2 grid-rows-2 gap-1 h-full">
  //               {displayImages.map((url, index) => (
  //                   <div key={index} className="overflow-hidden">
  //                       <img src={url} alt={`Image ${index + 1}`} className={imgClasses} onError={(e) => handleImageError(e, `Image ${index + 1}`)}/>
  //                   </div>
  //               ))}
  //           </div>
  //       )}

  //       {imageCount >= 5 && (
  //           <div className="grid grid-cols-2 gap-1 h-full">
  //               <div className="col-span-1 row-span-full overflow-hidden">
  //                   <img src={displayImages[0]} alt="Image 1" className={imgClasses} onError={(e) => handleImageError(e, "Image 1")}/>
  //               </div>
  //               <div className="col-span-1 grid grid-cols-2 grid-rows-2 gap-1">
  //                   {displayImages.slice(1, 5).map((url, index) => {
  //                       const imageIndex = index + 2; 
  //                       const isLastBox = index === 3; 
                        
  //                       return (
  //                           <div key={index} className="overflow-hidden relative">
  //                               <img
  //                                   src={url}
  //                                   alt={`Image ${imageIndex}`}
  //                                   className={imgClasses}
  //                                   onError={(e) => handleImageError(e, `Image ${imageIndex}`)}
  //                               />
  //                               {isLastBox && hasMoreImages && (
  //                                   <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-xl font-bold cursor-pointer">
  //                                       + තවත් {remainingImages}
  //                                   </div>
  //                               )}
  //                           </div>
  //                       );
  //                   })}
  //               </div>
  //           </div>
  //       )}
  //     </div>
  //   );
  // };
  
  // const renderVideos = () => {
  //   if (videos.length === 0) return null;
  //   const displayVideos = videos.slice(0, 2);
    
  //   const gridClass = displayVideos.length === 2 ? 'grid-cols-2' : 'grid-cols-1';

  //   return (
  //       <div className="mb-4">
  //           <h4 className="text-sm font-semibold text-gray-600 flex items-center mb-3"><Film className="w-4 h-4 mr-1"/> Attached Videos ({videos.length})</h4>
  //           <div className={`grid ${gridClass} gap-3`}>
  //               {displayVideos.map((url, index) => (
  //                   <div key={index} className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
  //                       <iframe 
  //                           src={url} 
  //                           title={`Video ${index + 1}`} 
  //                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  //                           allowFullScreen
  //                           className="w-full h-full border-none"
  //                       ></iframe>
  //                   </div>
  //               ))}
  //           </div>
  //       </div>
  //   );
  // };

  // const renderPDFs = () => {
  //   if (pdfs.length === 0) return null;
  //   const displayPDFs = pdfs.slice(0, 3);
  //   const pdfCount = displayPDFs.length;

  //   let gridClass = 'grid-cols-1';
  //   if (pdfCount === 2) {
  //       gridClass = 'grid-cols-2';
  //   } else if (pdfCount === 3) {
  //       gridClass = 'grid-cols-3';
  //   }

  //   return (
  //       <div className="mb-4">
  //           <h4 className="text-sm font-semibold text-gray-600 flex items-center mb-3"><FileText className="w-4 h-4 mr-1"/> Attached Documents ({pdfs.length})</h4>
  //           <div className={`grid ${gridClass} gap-0 rounded-lg overflow-hidden border border-gray-200 divide-x divide-gray-200`}>
  //               {displayPDFs.map((pdf, index) => (
  //                   <a 
  //                       key={index} 
  //                       href={pdf.url} 
  //                       target="_blank" 
  //                       rel="noopener noreferrer"
  //                       className="flex items-center p-3 hover:bg-green-50 transition cursor-pointer bg-white"
  //                   >
  //                       <FileText className="w-6 h-6 text-red-600 mr-3 shrink-0" />
  //                       <span className="flex-1 text-sm font-medium text-gray-800 truncate">{pdf.title}</span>
  //                       <Download className="w-5 h-5 text-green-600 ml-3 shrink-0"/>
  //                   </a>
  //               ))}
  //           </div>
  //       </div>
  //   );
  // };

  // Dula -choose type 
  // const renderMediaContent = () => {
  //     if (images.length > 0) {
  //         return renderImageGallery(); 
  //     }
  //     if (videos.length > 0) {
  //         return renderVideos(); 
  //     }
  //     if (pdfs.length > 0) {
  //         return renderPDFs(); 
  //     }
  //     return null;
  // };
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6 border border-gray-100 min-h-[550px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-sm mr-3">
          {initials}
        </div>
        <div>
          <p className="font-bold text-gray-800">{post.author}</p>
          <p className="text-xs text-gray-500">{post.date}</p>
        </div>
      </div>

      {/* Text */}
      <p className="text-gray-700 mb-4">{post.text.split('\n')[2]}</p>

      {/* Image Grid */}
      {post.imageUrls && post.imageUrls.length > 0 && (
        <div className={`grid gap-1 mb-4 overflow-hidden rounded-xl shadow-md bg-gray-100 
          ${post.imageUrls.length === 1 ? 'grid-cols-1' :
            post.imageUrls.length === 2 ? 'grid-cols-2' :
              post.imageUrls.length === 3 ? 'grid-cols-2' : 'grid-cols-2'}`}
          style={{ height: '300px' }}
        >
          {post.imageUrls.slice(0, 4).map((url, index) => (
            <div key={index} className={`relative w-full h-full overflow-hidden ${post.imageUrls!.length === 3 && index === 0 ? 'row-span-2' : ''
              }`}>
              <img
                src={url}
                alt={`Content by ${post.author}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/600x400/cccccc/333333?text=Content+Not+Available";
                }}
              />
              {/* Overlay for +N images */}
              {post.imageUrls!.length > 4 && index === 3 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl">
                  +{post.imageUrls!.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Fallback for single legacy imageUrl if imageUrls is empty but imageUrl exists */}
      {(!post.imageUrls || post.imageUrls.length === 0) && post.imageUrl && (
        <div className="relative w-full overflow-hidden rounded-xl shadow-md bg-gray-100 flex-1">
          <img
            src={post.imageUrl}
            alt={`Content by ${post.author}`}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://placehold.co/600x400/cccccc/333333?text=Content+Not+Available";
            }}
          />
        </div>
      )}

      {/* Actions */}
      <PostActions
        post={post}
        showComments={showComments}
        onToggleComments={() => setShowComments(!showComments)}
      />
    </div>
  );
};

export default CommunityPostCard;