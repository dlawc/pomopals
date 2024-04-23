<template>
    <div class="overlay">
        <div class="signout">
            <SignOutButton/>
        </div>
        <div class = navbar>
            <NavBar/>
        </div>
        <div class = center>
            <URLDisplay/>
        </div>
    </div>
    
</template>
<script>
import NavBar from "@/components/NavBar.vue"
import SignOutButton from "@/components/SignOutButton.vue"
import URLDisplay from "@/components/URLDisplay.vue"

export default {
    name: "URLBlocker", 
    components: {
        NavBar, 
        SignOutButton, 
        URLDisplay,
    }, 
}
</script>