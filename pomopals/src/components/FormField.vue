<template>
  <div class="form-group">
    <label :for="fieldId">{{ label }}<span class="required">*</span></label>
    <div class="input-container">
      <input 
        :type="fieldType" 
        :id="fieldId" 
        :value="value" 
        @input="$emit('update:value', $event.target.value)"
        required
        :class="{ 'input-with-button': isPassword }"
      >
      <img 
        v-if="isPassword" 
        :src="isVisible ? hideIcon : eyeIcon" 
        @click="toggleVisibility"
        class="password-toggle-icon" 
        :alt="isVisible ? 'Hide password' : 'Show password'"
      >
    </div>
  </div>
</template>
  
<script>

import eyeIcon from '@/assets/eye.png';
import hideIcon from '@/assets/hide.png';

export default {
  props: {
    label: String,
    fieldId: String,
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    isPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isVisible: false,
      eyeIcon,
      hideIcon
    };
  },
  computed: {
    fieldType() {
      return this.isPassword && !this.isVisible ? 'password' : 'text';
    }
  },
  methods: {
    toggleVisibility(event) {
    event.preventDefault(); 
    this.isVisible = !this.isVisible;
  },
  onInput($event) {
    this.$emit('update:value', $event.target.value);
  },
  }
};
</script>
  

<style scoped>
.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  display: block;
  color: #2B3674;
  font-family: 'DM Sans', sans-serif;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
}

.input-container {
  display: flex;
  align-items: center;
  position: relative;
}

.input-with-button {
  flex: 1;
  border-radius: 16px 0 0 16px; 
}

.input-with-button input {
  padding-right: 40px; 
}

.toggle-password {
  border-radius: 0 16px 16px 0; 
}

.password-toggle-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 20px; 
  width: auto;
  cursor: pointer;
}
.required {
  color: red;
}
</style>