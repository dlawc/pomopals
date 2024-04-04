<template>
  <div class="progress"> 
    <div class="progress_fill" :style="{ width: value + '%' }"></div>
    <span class="progress_text">{{ value }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
.progress {
  position: relative;
  width: 210px;
  min-width: 210px;
  max-width: 210px;
  height: 30px;
  background-color: #9cbab4;
  border-radius: 5px;
  overflow: hidden;
}

.progress_fill {
  
  height: 100%;
  background-color: #009579;
}

.progress_text {
  position: absolute;
  right: 0; 
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-weight: bold;
  font-size: 13px;
  transition: color 0.25s ease, transform 0.25s ease;
}

</style>