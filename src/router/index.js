import AdminDashboard from "@/views/admin/AdminDashboard.vue";
import AdminSettings from "@/views/admin/AdminSettings.vue";
import CustomNotes from "@/views/admin/CustomNotes.vue";
import LocationPricing from "@/views/admin/LocationPricing.vue";
import OrdersMgt from "@/views/admin/OrdersMgt.vue";
import ReceiptMgt from "@/views/admin/ReceiptMgt.vue";
import RidersMgt from "@/views/admin/RidersMgt.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";
import OnboardingComp from "@/views/auth/OnboardingComp.vue";
import SignIn from "@/views/auth/SignIn.vue";
import SignUp from "@/views/auth/SignUp.vue";
import { createRouter, createWebHistory } from "vue-router";

const user = false;

const routes = [
  {
    path: "/",
    name: "Root",
    redirect: () => {
      return user ? { name: "Dashboard" } : { name: "SignIn" };
    },
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/onboarding",
    name: "Onboarding",
    component: OnboardingComp,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/orders",
    name: "Orders",
    component: OrdersMgt,
    meta: { requiresAuth: true },
  },
  {
    path: "/receipts",
    name: "Receipts",
    component: ReceiptMgt,
    meta: { requiresAuth: true },
  },
  {
    path: "/riders",
    name: "Riders",
    component: RidersMgt,
    meta: { requiresAuth: true },
  },
  {
    path: "/locations",
    name: "Locations",
    component: LocationPricing,
    meta: { requiresAuth: true },
  },
  {
    path: "/custom-notes",
    name: "CustomNotes",
    component: CustomNotes,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: AdminSettings,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (!user && requiresAuth) {
    next("/sign-in");
  } else if (to.name === "SignIn" && user) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
