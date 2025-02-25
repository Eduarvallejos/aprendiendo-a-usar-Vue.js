<template>
    <h1>Post Comments </h1>
    <div class="comments">
        <Comments/>
    </div>
</template>

<script>
import Comments from '@/components/PostComments.vue';

export default {
    components: {
        Comments
    }
}
</script>

<style scoped>
.comments {
    display: flex;
    justify-content: center;
    margin: 20px;
    gap: 1rem;
}
</style>