<template>
    <div class="toggle-container">
      <div class="toggle-text"><b>Toggle URL Blocker :</b></div>
      <img :src="imageSRC" class="toggle-image" @click="toggleImage" width = 30>
    </div>
</template>
<script>
import toggleOffImage from '@/assets/toggle_off.png';
import toggleOnImage from '@/assets/toggle_on.png';

export default {
    data() {
        return {
        isToggled: false, 
        imageSRC: toggleOffImage
        };
    },
    methods: {
        toggleImage() {
            this.isToggled = !this.isToggled;
            this.imageSRC = this.isToggled ? toggleOnImage : toggleOffImage;
        }
    }
};
</script>
<style scoped>
.toggle-container {
    display: flex;
    align-items: center;
}

.toggle-text {
    color: white;
}

.toggle-image {
    cursor: pointer;
}
</style>
