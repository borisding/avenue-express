<template>
    <nav class="panel">
        <p class="panel-heading">Dashboard Panel</p>
        <div class="panel-block dashboard">{{message}}</div>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      message: 'This is gonna be the dashboard panel.'
    };
  }
};
</script>

<style>
.dashboard {
  color: #222;
}
</style>