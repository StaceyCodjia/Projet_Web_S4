import { ref, watch } from 'vue'

const favorites = ref(JSON.parse(localStorage.getItem('genshin_favorites') ?? '[]'))

watch(favorites, (val) => localStorage.setItem('genshin_favorites', JSON.stringify(val)), { deep: true })

export function useFavorites() {
  function toggleFavorite(name) {
    const idx = favorites.value.indexOf(name)
    if (idx === -1) favorites.value.push(name)
    else favorites.value.splice(idx, 1)
  }

  return { favorites, toggleFavorite }
}
