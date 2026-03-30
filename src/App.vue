<template>
  <GalleryHeader />
  <CharacterSearch v-model:search="search" />
  <VisionFilters :selectedVision="selectedVision" @vision-selected="selectedVision = $event" />

  <CharacterGallery v-if="filteredCharacters.length > 0" :characters="filteredCharacters" />
  <div v-else-if="!isLoading" class="empty">
    Aucun résultat pour "{{ search }}"
  </div>

  <GalleryFooter />
  <div v-show="isLoading" class="loading">Chargement des personnages...</div>
</template>

<style scoped>
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  color: #888;
  text-align: center;
  font-size: 1.1rem;
  padding: 1rem;
}
</style>

<script setup>
import { ref,computed,onMounted } from 'vue'
import { genshinService } from './services/genshinapi'
import GalleryHeader from './components/GalleryHeader.vue'
import CharacterSearch from './components/CharacterSearch.vue'
import VisionFilters from './components/VisionFilters.vue'
import CharacterGallery from './components/CharacterGallery.vue'
import GalleryFooter from './components/GalleryFooter.vue'

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