<template>
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
  <div v-show="isLoading" class="loading">Chargement des personnages...</div>
</template>

<style scoped>
.empty, .loading {
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
import { genshinService } from '../services/genshinapi'
import CharacterSearch from '../components/CharacterSearch.vue'
import VisionFilters from '../components/VisionFilters.vue'
import CharacterGallery from '../components/CharacterGallery.vue'
import { useFavorites } from '../composables/useFavorites'

const characters = ref([])
const selectedVision = ref(localStorage.getItem('genshin_vision_filter') ?? 'All')
const search = ref('')
const isLoading = ref(false)
const { favorites, toggleFavorite } = useFavorites()

watch(selectedVision, (val) => localStorage.setItem('genshin_vision_filter', val))

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
