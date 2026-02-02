<template>
  <h1>Genshin Characters</h1>
  <div id="genshin-characters-gallery">
    <CharacterCard
      v-for="character in CharactersData"
      :key="character.id"
      :name="character.name"
      :vision="character.vision"
      :type="character.type"
      :pictureUrl="character.pictureUrl"
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
</style>
<script setup>
import CharacterCard from './components/CharacterCard.vue'
import CharactersData from './CharactersData.js'
</script>