<template>
  <div id="genshin-characters-gallery">
    <CharacterCard
      v-for="character in characters"
      :key="character.id"
      :name="character.name"
      :vision="character.vision"
      :weapon="character.weapon"
      :pictureUrl="character.pictureUrl"
      :nation="character.nation"
      :constellation="character.constellation"
      :birthday="character.birthday"
      :description="character.description"
      :rarity="character.rarity"
    />
  </div>
</template>

<style scoped>
#genshin-characters-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr));
  gap: 20px;
  padding: 20px 16px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  box-sizing: border-box;
}

@media (max-width: 480px) {
  #genshin-characters-gallery {
    grid-template-columns: 1fr;
    padding: 12px 10px;
    gap: 14px;
  }
}
</style>

<script setup>
import CharacterCard from './CharacterCard.vue'

defineProps({
  characters: {
    type: Array,
    default: () => []
  }
})
</script>
