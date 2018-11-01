<template>
  <article class="message is-info">
  <div class="message-header">
    <p>Greetings Admin</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <div class="message-body"><span class="greetings">{{message}}</span></div>
</article>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Admin! Thanks for checking this out.'
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