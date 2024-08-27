import Image from 'next/image';

interface ImageData {
  id: string;
  url: string;
  description?: string;
}

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/images`);
  
  // Check if the response is okay
  if (!res.ok) {
    throw new Error('Failed to fetch images');
  }

  const images: ImageData[] = await res.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">Images</h1> 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images?.map((image) => (
          <div key={image.id} className="w-40 h-80 relative">
            <Image
              src={image.url}
              alt={image.description || "Image"}
              layout="fill"
              objectFit="cover"
              className="rounded-lg cursor-pointer"

            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 ease-in-out rounded-lg">
              <p className="text-white text-center text-sm">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
