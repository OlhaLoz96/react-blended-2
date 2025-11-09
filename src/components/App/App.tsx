import Section from "../Section/Section";
import Container from "../Container/Container";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import Form from "../Form/Form";
import { getPhotos } from "../../services/photos";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
// import Modal from "../Modal/Modal";

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSearch = async (query: string) => {
    // console.log(query);
    try {
      setIsError(false);
      setIsLoading(true);
      setPhotos([]);

      const fetchedPhotos = await getPhotos(query);

      if (!fetchedPhotos.length) {
        toast.error("No photos for your request");
        return;
      }

      setPhotos(fetchedPhotos);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(photos);
  console.log(selectedPhoto);

  const handleSelectedPhoto = (photo: Photo | null) => {
    setSelectedPhoto(photo);
  };
  console.log(handleSelectedPhoto);

  return (
    <>
      <Section>
        <Container>
          <Form onSearch={handleSearch} />
          {isLoading && <Loader />}
          {isError && <Text textAlign="center"> Something went wrong...</Text>}
          {photos.length > 0 && <PhotosGallery photos={photos} />}
          {/* {selectedPhoto && <Modal onClose={} />} */}
        </Container>
      </Section>
    </>
  );
}
