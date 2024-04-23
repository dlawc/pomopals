<template>
    <div class="overlay">
        <div class="signout">
        <SignOutButton />
      </div>
    <div class = navbar>
        <NavBar/>
    </div>
    <div class = center>
        <URLDisplay/>
    </div>
    <ToggleURL/>
    </div>
    
</template>
<script>
import NavBar from "@/components/NavBar.vue"
import SignOutButton from "@/components/SignOutButton.vue"
import URLDisplay from "@/components/URLDisplay.vue"
import ToggleURL from "@/components/ToggleURL.vue"

export default {
    name: "URLBlocker", 
    components: {
        NavBar, 
        SignOutButton, 
        URLDisplay,
        ToggleURL, 
    }, 
}
</script>