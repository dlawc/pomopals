<template>
    <div class = "navbar">
    <nav>
        <router-link to="/home" class = "nav-btn" id = "home"><img src = "@/assets/home_empty.png" width = 30></router-link><br>
        <router-link to="/leaderboard" class = "nav-btn" id = "leaderboard"><img src = "@/assets/leaderboard_empty.png" width = 30></router-link><br>
        <router-link to="/friends" class = "nav-btn" id = "friends"><img src = "@/assets/friends_empty.png" width = 30></router-link><br>
        <!--<router-link to="/achievements" class = "nav-btn" id = "achievements"><img src = "@/assets/achievements_empty.png" width = 30></router-link><br>-->
        <router-link to="/urlblocker" class = "nav-btn" id = "url"><img src = "@/assets/url_empty.png" width = 30></router-link>
    </nav>
    </div>
</template>
<script> 
export default {
    name:"Nav"
}
</script>
<style>
.navbar{
    height: 100%; /* 100% Full-height */
    position: fixed; /* Stay in place */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 200px; 
    padding-left: 20px; 
}
.nav-btn{
    background-color: transparent;
}
#home:hover img {
    content: url('@/assets/home_filled.png'); 
}
#leaderboard:hover img {
    content: url('@/assets/leaderboard_filled.png'); 
}
#friends:hover img {
    content: url('@/assets/friends_filled.png'); 
}
#achievements:hover img {
    content: url('@/assets/achievements_filled.png'); 
}
#url:hover img {
content: url('@/assets/url_filled.png'); 
}
</style>