<template>
  <GalleryHeader />
  <CharacterSearch v-model:search="search" />
  <VisionFilters :selectedVision="selectedVision" @vision-selected="selectedVision = $event" />
  <CharacterGallery :characters="filteredCharacters" />
</template>

<style scoped>
</style>

<script setup>
import { ref,computed,onMounted } from 'vue'
import { genshinService } from './services/genshinapi'
import GalleryHeader from './components/GalleryHeader.vue'
import CharacterSearch from './components/CharacterSearch.vue'
import VisionFilters from './components/VisionFilters.vue'
import CharacterGallery from './components/CharacterGallery.vue'

const characters = ref([])
const selectedVision = ref('All')
const search = ref('')

onMounted(async () => {
  try {
    characters.value = await genshinService.getAllCharacters()
  } catch (error) {
    console.error('Erreur lors du chargement des personnages :', error)
  }
})

const filteredCharacters = computed(() => {
  let filtered = characters.value

  if (selectedVision.value !== 'All') {
    filtered = filtered.filter(char => char.vision === selectedVision.value)
  }

  const term = search.value.trim().toLowerCase()
  if (term) {
    filtered = filtered.filter(char => char.name.toLowerCase().includes(term))
  }

  return filtered
})
</script>