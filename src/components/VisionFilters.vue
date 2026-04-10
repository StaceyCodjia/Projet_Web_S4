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
  margin: 16px 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.filters button {
  padding: 8px 14px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  font-size: clamp(0.75rem, 2.5vw, 0.9rem);
  white-space: nowrap;
}

.filters button.active {
  background-color: #1ee3ea;
  animation: button-pulse 2s ease-in-out infinite;
}

.filters button:hover {
  background-color: #0056b3;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 86, 179, 0.5);
}

@keyframes button-pulse {
  0%, 100% {
    box-shadow: 0 0 6px rgba(30, 227, 234, 0.4);
  }
  50% {
    box-shadow: 0 0 16px rgba(30, 227, 234, 0.9);
  }
}

@media (max-width: 480px) {
  .filters button {
    padding: 6px 10px;
  }
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
