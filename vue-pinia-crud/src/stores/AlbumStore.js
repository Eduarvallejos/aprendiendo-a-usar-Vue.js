import axios from "axios";
import { defineStore } from "pinia";

export const useAlbumStore = defineStore("albumStore", {
  state: () => ({
    albums: [],
    albumUser: [],
    photos: [],
    photosAlbum: [],
  }),
  getters: {
    getPhotosByAlbum: (state) => {
      return (albumId) =>
        state.photos.filter((photo) => photo.albumId == albumId).length;
    },
  },
  actions: {
    async fetchAlbum() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums"
        );
        this.albums = response.data;
        console.log("solicidud exitosa de Albums");
      } catch (error) {
        console.log("Fallo al solicitar datos de Albums", error);
      }
    },
    async fetchPhotos() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/photos"
        );
        this.photos = response.data;
        console.log('Solicitud exitosa de Photos')
      } catch (error) {
        console.error('Fallo al solicitar datos de Photos', error)
      }
    },
    getAlbum(userId) {
      const albums = this.albums.filter((album) => album.userId == userId);
      this.albumUser = albums;
    },
    getPhotosAlbum(albumId) {
      const photos = this.photos.filter((photo) => photo.albumId == albumId);
      this.photosAlbum = photos;
    },
  },
  persist: true,
});
