<template>
  <div id="characters-search">
    <input
      type="text"
      :value="search"
      placeholder="Search Genshin characters"
      @input="$emit('update:search', $event.target.value)"
    />
  </div>
</template>

<style scoped>
#characters-search {
  margin: 20px auto;
  width: min(90%, 500px);
}

#characters-search input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid #d3bc8e;
  border-radius: 999px;
  background-color: rgba(255,255,255,0.95);
  color: #111;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
}

#characters-search input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 4px rgba(0,123,255,0.15);
}
</style>

<script setup>
defineProps({
  search: {
    type: String,
    default: ''
  }
})

defineEmits(['update:search'])
</script>