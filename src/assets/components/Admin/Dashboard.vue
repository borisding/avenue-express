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
      message:
        'We do not need SEO friendly for Admin Portal. Thus, we go for Single Page Application approach.'
    };
  }
};
</script>

<style>
.dashboard {
  color: #222;
}
</style>