<template>
    <div>
        <p><strong>Total Photos: {{ photos.length }}</strong></p>
        <ol>
            <li v-for="photo in photos">
                <p>{{ photo.title }}.</p>
                <img v-bind:src="photo.url" alt="">
            </li>
        </ol>
    </div>
</template>

<script>
import { useAlbumStore } from '@/stores/AlbumStore';
import { storeToRefs } from 'pinia';

export default {
    setup() {
        const storeAlbum = useAlbumStore()
        const {photos} = storeToRefs(storeAlbum)
        return {photos}
    }
}
</script>