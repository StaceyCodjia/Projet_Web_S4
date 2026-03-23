<template>
  <div class="filters">
    <button
      v-for="vision in visions"
      :key="vision"
      @click="$emit('vision-selected', vision)"
      :class="{ active: selectedVision === vision }"
    >
      {{ vision }}
    </button>
  </div>
</template>

<style scoped>
.filters {
  margin: 20px;
}

.filters button {
  margin-right: 10px;
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filters button.active {
  background-color: #0056b3;
}

.filters button:hover {
  background-color: #0056b3;
}
</style>

<script setup>
defineProps({
  selectedVision: {
    type: String,
    default: 'All'
  }
})

defineEmits(['vision-selected'])

const visions = ['All', 'Cryo', 'Hydro', 'Pyro', 'Electro', 'Anemo', 'Geo', 'Dendro']
</script>