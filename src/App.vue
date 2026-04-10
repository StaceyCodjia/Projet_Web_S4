<template>
  <GalleryHeader />
  <CharacterSearch v-model:search="search" />
  <VisionFilters :selectedVision="selectedVision" @vision-selected="selectedVision = $event" />

  <CharacterGallery
    v-if="filteredCharacters.length > 0"
    :characters="filteredCharacters"
    :favorites="favorites"
    @toggle-favorite="toggleFavorite"
  />
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
import { ref, computed, onMounted, watch } from 'vue'
import { genshinService } from './services/genshinapi'
import GalleryHeader from './components/GalleryHeader.vue'
import CharacterSearch from './components/CharacterSearch.vue'
import VisionFilters from './components/VisionFilters.vue'
import CharacterGallery from './components/CharacterGallery.vue'
import GalleryFooter from './components/GalleryFooter.vue'

const characters = ref([])
const selectedVision = ref(localStorage.getItem('genshin_vision_filter') ?? 'All')
const search = ref('')
const favorites = ref(JSON.parse(localStorage.getItem('genshin_favorites') ?? '[]'))
const isLoading = ref(false)

watch(selectedVision, (val) => localStorage.setItem('genshin_vision_filter', val))
watch(favorites, (val) => localStorage.setItem('genshin_favorites', JSON.stringify(val)), { deep: true })

function toggleFavorite(name) {
  const idx = favorites.value.indexOf(name)
  if (idx === -1) {
    favorites.value.push(name)
  } else {
    favorites.value.splice(idx, 1)
  }
}

onMounted(async () => {
  isLoading.value = true
  try {
    characters.value = await genshinService.getAllCharacters()
  } catch (error) {
    console.error('Erreur lors du chargement des personnages :', error)
  } finally {
    isLoading.value = false
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