<template>
<header class="gallery-header">
  <div class = "banner">
    <h1 class="main-title">Genshin Characters Gallery</h1>
  </div>
    <div class="title-underline"></div>
  </header>
    <div id="characters-search">
      <input type="text" v-model="search" placeholder="Search Genshin characters" />
    </div>
  <div class="filters">
      <button @click="selectedVision = 'All'">All</button>
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
      :rarity="character.rarity"
    />
  </div>
  
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');
.gallery-header {
  min-height: 350px; 
  height: 45vh;
  padding: 50px 20px 30px;
  text-align: center;
  background-image: url('https://i.imgur.com/eH9ErgW.jpg');
  background-size: cover;   
  background-position: center;
}
.banner {
  padding: 20px 40px;
  border-radius: 10px;
  background-color: rgba(1, 56, 115, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(211, 188, 142, 0.3); 
  backdrop-filter: blur(5px);
}
.main-title {
  font-family: 'Cinzel', serif;
  font-size: 3.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 6px;
  margin: 0;
  
  background: linear-gradient(to bottom, #ece5d8 0%, #d3bc8e 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  filter: drop-shadow(0 0 8px rgba(211, 188, 142, 0.3));
}

.title-underline {
  width: 150px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #d3bc8e, transparent);
  margin: 15px auto 0;
}

#genshin-characters-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 10px;
  justify-content: center;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
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
import { ref,computed,onMounted } from 'vue'
import { genshinService } from './services/genshinapi'
import CharacterCard from './components/CharacterCard.vue'

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