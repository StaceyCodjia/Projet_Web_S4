<template>
  <div class="card">
    <img :src="pictureUrl" :alt="name" style="width: 200px;" />
    <h2>{{ name }}</h2>
    <p>Vision: {{ vision }}</p>
    <p>Type: {{ type }}</p>
  </div>
</template>
<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  background: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card img {
  border-radius: 8px;
  margin-bottom: 10px;
}
</style>
<script setup>
defineProps(['name', 'vision', 'type', 'pictureUrl']);
</script>