import { user, guest, admin, canEditEvent } from "src/roleGetter";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/EventsList.vue") },
      {
        path: "events-list",
        name: "events-list",
        component: () => import("pages/EventsList.vue"),
      },
      {
        path: "/event-page",
        name: "event",
        component: () => import("pages/EventPage.vue"),
        props: (route) => ({
          id: route.query.id,
        }),
      },
      {
        path: "/notification",
        name: "notification",
        component: () => import("pages/MyNotifications.vue"),
      },
      {
        path: "/map",
        name: "map",
        component: () => import("pages/MapView.vue"),
      },
      {
        path: "/create-event",
        name: "create-event",
        component: () => import("pages/CreateEvent.vue"),
        beforeEnter(to, from, next) {
          if (guest()) {
            next("/start-menu");
          } else {
            next();
          }
        },
      },
      {
        path: "/edit-event/:id",
        name: "edit-event",
        component: () => import("pages/EditEvent.vue"),
        props: true,
        beforeEnter(to, from, next) {
          if (canEditEvent(to.query.id)) {
            next("/start-menu");
          } else {
            next();
          }
        },
      },
      {
        path: "/forgot-password",
        name: "forgot-password",
        component: () => import("pages/ForgotPassword.vue"),
      },
      {
        path: "/reset-password",
        name: "reset-password",
        component: () => import("pages/ResetPassword.vue"),
      },
      {
        path: "/start-menu",
        name: "start-menu",
        component: () => import("pages/StartMenu.vue"),
      },
      {
        path: "/profile-page",
        name: "profile-page",
        component: () => import("pages/ProfilePage.vue"),
        props: (route) => ({
          id: route.query.id,
        }),
      },
      {
        path: "/edit-profile",
        name: "edit-profile",
        component: () => import("pages/EditProfilePage.vue"),
      },
      {
        path: "/admin-menu",
        name: "admin-menu",
        component: () => import("pages/AdminMenu.vue"),
        
        beforeEnter(to, from, next) {
          if (!admin()) {
            next("/start-menu");
          } else {
            next();
          }
        },
        
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: "/:catchAll(.*)*",
  //   component: () => import("pages/ErrorNotFound.vue"),
  // },
];

export default routes;
