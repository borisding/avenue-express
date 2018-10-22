<template>
  <div class="greetings">{{ greetings }}</div>
</template>

<script>
export default {
  data() {
    return {
      greetings: 'Hi! This is loaded from Vue Home single file component.'
    };
  }
};
</script>

<style>
.greetings {
  color: #00f;
}
</style>