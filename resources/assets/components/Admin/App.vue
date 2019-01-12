<template>
<div>
<h1 class="title">Hello! Welcome to Admin Portal with Single Page Design</h1>
<h2 class="subtitle">Assumed you have been logged in as admin :)</h2>
<p>
<router-link to="/">Dashboard</router-link> &raquo;
<router-link to="/users">Users</router-link> &raquo;
<a href="/">Log Out</a>
</p>
<br>
<router-view></router-view>
</div>
</template>

<script>
export default { name: 'app' };
</script>
