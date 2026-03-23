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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px 10px;
  justify-content: center;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
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