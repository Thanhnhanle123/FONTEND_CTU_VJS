import ContactBook from "@/views/ContactBook.vue";
import NotFound from "@/views/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactAddUpdate.vue"),
    props: true,
  },
  {
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("@/views/ContactAddUpdate.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
