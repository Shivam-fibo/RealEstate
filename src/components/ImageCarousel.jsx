// components/ImageCarousel.tsx
const ImageCarousel = ({images}) => {
  if (!images || images.length === 0) return <p>No images available</p>;

  return (
    <div className="w-full h-[300px] bg-gray-200 rounded overflow-hidden">
      <img
        src={images[0]?.url}
        alt={images[0]?.caption || 'Property Image'}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ImageCarousel;
