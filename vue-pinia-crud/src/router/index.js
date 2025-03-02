import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import UserView from "@/views/UserView.vue";
import PostsView from "@/views/PostsView.vue";
import PostDetails from "@/views/PostDetails.vue";
import PhotosView from "@/views/PhotosView.vue";
import AlbumDetails from "@/views/AlbumDetails.vue";
import CreatePost from "@/views/CreatePost.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", name: "Home", component: Home},
    {path: "/user/:id", name: "UserView", component: UserView},
    {path: '/Posts', name: 'Posts', component: PostsView},
    {path: '/PostDetails/:id', name: 'PostDetails', component: PostDetails},
    {path: '/Photos', name: 'Photos', component: PhotosView},
    {path:'/AlbumDetails/:id', name:'AlbumDetails', component: AlbumDetails},
    {path:'/Create-Post', name: 'CreatePost', component: CreatePost}
  ],
});

export default router;
