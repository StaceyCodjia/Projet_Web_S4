<template>
  <h1>Genshin Characters</h1>
  <div class="filters">
      <button @click="selectedVision = 'All'">Tous</button>
      <button @click="selectedVision = 'Cryo'">Cryo</button>
      <button @click="selectedVision = 'Hydro'">Hydro</button>
      <button @click="selectedVision = 'Pyro'">Pyro</button>
      <button @click="selectedVision = 'Electro'">Electro</button>
      <button @click="selectedVision = 'Anemo'">Anemo</button>
      <button @click="selectedVision = 'Geo'">Geo</button>
      <button @click="selectedVision = 'Dendro'">Dendro</button>
    </div>
  <div id="genshin-characters-gallery">
    <CharacterCard
      v-for="character in filteredCharacters"
      :key="character.id"
      :name="character.name"
      :vision="character.vision"
      :weapon="character.weapon"
      :pictureUrl="character.pictureUrl"
      :nation="character.nation"
      :constellation="character.constellation"
      :birthday="character.birthday"
    />
  </div>
  
</template>

<style scoped>
#genshin-characters-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}
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
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { genshinService } from './services/genshinapi'
import CharacterCard from './components/CharacterCard.vue'

const characters = ref([])
const selectedVision = ref('All')

onMounted(async () => {
  try {
    characters.value = await genshinService.getAllCharacters()
  } catch (error) {
    console.error('Erreur lors du chargement des personnages :', error)
  }
})

const filteredCharacters = computed(() => {
  if (selectedVision.value === 'All') return characters.value
  return characters.value.filter(char => char.vision === selectedVision.value)
})
</script>