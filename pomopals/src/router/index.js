import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import SignUpPage from "@/views/SignUpPage.vue";
import HomePage from "@/views/HomePage.vue";
import FriendsPage from "@/views/FriendsPage.vue";
import LeaderboardPage from "@/views/LeaderboardPage.vue";
import FriendsLeaderboardPage from "@/views/FriendsLeaderboardPage.vue";
import URLBlockerPage from "@/views/URLBlockerPage.vue";
import AchievementPage from "@/views/Achievements.vue"
import AllAchievementPage from "@/views/AllAchievements.vue";
import BlockedPage from "@/views/BlockedPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage,
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage,
    },
    {
      path: "/signup",
      name: "SignUpPage",
      component: SignUpPage,
    },
    {
      path: "/home",
      name: "HomePage",
      component: HomePage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/friends",
      name: "FriendsPage",
      component: FriendsPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/leaderboard",
      name: "LeaderboardPage",
      component: LeaderboardPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/friendsleaderboard",
      name: "FriendsLeaderboardPage",
      component: FriendsLeaderboardPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/urlblocker",
      name: "URLBlockerPage",
      component: URLBlockerPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/achievements", 
      name: "AchievementPage", 
      component: AchievementPage,
      meta: {
        requiresAuth: true
      }
    }, 
    {
      path: "/allachievements", 
      name: "AllAchievementPage", 
      component: AllAchievementPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/blocked", 
      name: "BlockedPage", 
      component: BlockedPage,
      meta: {
        requiresAuth: true
      }
      
    }, 
  ],
});

export default router;
