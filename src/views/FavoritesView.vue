<template>
  <div class="favorites-view">
    <h2 class="page-title">Mes favoris</h2>

    <CharacterGallery
      v-if="!isLoading && favoriteCharacters.length > 0"
      :characters="favoriteCharacters"
      :favorites="favorites"
      @toggle-favorite="toggleFavorite"
    />
    <div v-else-if="!isLoading" class="empty">
      <p>Aucun favori pour l'instant.</p>
      <RouterLink to="/" class="back-link">Découvrir les personnages →</RouterLink>
    </div>
    <div v-else class="loading">Chargement...</div>
  </div>
</template>

<style scoped>
.favorites-view {
  padding: 0 16px;
}

.page-title {
  text-align: center;
  font-family: 'Cinzel', serif;
  color: #d3bc8e;
  font-size: clamp(1.2rem, 4vw, 2rem);
  margin: 24px 0 8px;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  color: #888;
  gap: 16px;
  font-size: 1.1rem;
}

.back-link {
  color: #d3bc8e;
  text-decoration: none;
  font-weight: bold;
}

.back-link:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding: 4rem;
  color: #888;
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { genshinService } from '../services/genshinapi'
import CharacterGallery from '../components/CharacterGallery.vue'
import { useFavorites } from '../composables/useFavorites'

const characters = ref([])
const isLoading = ref(false)
const { favorites, toggleFavorite } = useFavorites()

onMounted(async () => {
  isLoading.value = true
  try {
    characters.value = await genshinService.getAllCharacters()
  } catch {
    // silent
  } finally {
    isLoading.value = false
  }
})

const favoriteCharacters = computed(() =>
  characters.value.filter(char => favorites.value.includes(char.name))
)
</script>
