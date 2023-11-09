import { createRouter, createWebHistory } from "vue-router"

import HomeView from "@/views/HomeView.vue"
import ArtworksView from "@/views/artworks/ArtworksView.vue"
import ArtworkDetailView from "@/views/artworks/ArtworkDetailView.vue"
import ArtistsView from "@/views/artists/ArtistsView.vue"
import ArtistDetailView from "@/views/artists/detail/ArtistDetailView.vue"
import GalleriesView from "@/views/galleries/GalleriesView.vue"
import GalleryDetail from "@/views/galleries/GalleryDetailView.vue"
import ExhibitionView from "@/views/exhibitions/ExhibitionsView.vue"
import TheExhibitionDetail from "@/components/exhibition/detail/TheExhibitionDetail.vue"
import RegisterView from "@/views/auth/RegisterView.vue"
import LoginView from "@/views/auth/LoginView.vue"
import ForgotPasswordView from "@/views/auth/ForgotPasswordView.vue"
import ResetPasswordView from "@/views/auth/ResetPasswordView.vue"
import ProfileView from "@/views/profile/ProfileView.vue"
import ContactView from "@/views/ContactView.vue"
import CGVView from "@/views/CGVView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/oeuvres",
    name: "artworks",
    component: ArtworksView,
  },
  {
    path: "/oeuvres/:id",
    name: "artworks-id",
    component: ArtworkDetailView,
  },
  {
    path: "/artistes",
    name: "artists",
    component: ArtistsView,
  },
  {
    path: "/artistes/:id",
    name: "artists-id",
    component: ArtistDetailView,
  },
  {
    path: "/galleries",
    name: "galleries",
    component: GalleriesView,
  },
  {
    path: "/galleries/:id",
    name: "galleries-id",
    component: GalleryDetail,
  },
  {
    path: "/expositions",
    name: "exhibitions",
    component: ExhibitionView,
  },
  {
    path: "/expositions/:id",
    name: "exhibitions-id",
    component: TheExhibitionDetail,
  },

  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },

  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: ForgotPasswordView,
  },
  {
    path: "/reset-password/:token?",
    name: "reset-password",
    component: ResetPasswordView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
  },
  {
    path: "/cgv",
    name: "cgv",
    component: CGVView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
