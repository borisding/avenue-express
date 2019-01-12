<template>
  <article class="message is-info">
  <div class="message-header">
    <p>Greetings Widget</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <div class="message-body"><span class="greetings">{{message}}</span></div>
</article>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hi! This widget is loaded from Home Vue single file component.'
    };
  }
};
</script>

<style>
.greetings {
  color: #00f;
}
.message {
  margin-top: 25px;
}
</style>