<template>
  <div v-if="character" class="character-view">
    <RouterLink to="/" class="back-btn">← Retour à la galerie</RouterLink>

    <div :class="['character-detail', character.vision.toLowerCase()]">
      <div class="portrait-col">
        <img :src="character.pictureUrl" :alt="character.name" class="portrait" />
        <button
          class="fav-btn"
          :class="{ active: isFav }"
          @click="toggleFavorite(character.name)"
        >
          {{ isFav ? '♥ Retirer des favoris' : '♡ Ajouter aux favoris' }}
        </button>
      </div>

      <div class="info-col">
        <h1 class="char-name">{{ character.name }}</h1>
        <div class="rarity">{{ '★'.repeat(character.rarity) }}</div>

        <div class="info-grid">
          <span class="label">Vision</span>
          <span class="element-text">{{ character.vision }}</span>
          <span class="label">Arme</span>
          <span>{{ character.weapon }}</span>
          <span class="label">Nation</span>
          <span>{{ character.nation }}</span>
          <span class="label">Constellation</span>
          <span>{{ character.constellation }}</span>
          <span class="label">Anniversaire</span>
          <span>{{ character.birthday || '—' }}</span>
        </div>

        <p class="description">{{ character.description }}</p>

        <h3 class="section-title">Talents</h3>
        <div v-for="talent in character.skillTalents" :key="talent.name" class="talent-item">
          <div class="talent-header">
            <strong>{{ talent.name }}</strong>
            <span class="talent-unlock">{{ talent.unlock }}</span>
          </div>
          <p class="talent-desc">{{ talent.description?.slice(0, 180) }}…</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="error" class="error">Personnage introuvable.</div>
  <div v-else class="loading">Chargement du personnage...</div>
</template>

<style scoped>
.character-view {
  padding: 20px 16px 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.back-btn {
  display: inline-block;
  color: #d3bc8e;
  text-decoration: none;
  margin-bottom: 20px;
  font-weight: bold;
  transition: opacity 0.2s;
}

.back-btn:hover { opacity: 0.7; }

.character-detail {
  --elem-color: #d3bc8e;
  display: flex;
  gap: 32px;
  background: linear-gradient(135deg, #fffaf0, #fff8ec);
  border: 1px solid rgba(207, 161, 58, 0.45);
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 8px 24px rgba(186, 143, 59, 0.2);
}

.character-detail.pyro { --elem-color: #ef797c; }
.character-detail.hydro { --elem-color: #4cc9f0; }
.character-detail.cryo { --elem-color: #98d8d8; }
.character-detail.electro { --elem-color: #af8ec1; }
.character-detail.anemo { --elem-color: #74c2a8; }
.character-detail.geo { --elem-color: #fab72e; }
.character-detail.dendro { --elem-color: #a5c83b; }

.portrait-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.portrait {
  width: clamp(120px, 25vw, 200px);
  height: auto;
  border-radius: 8px;
  mask-image: linear-gradient(to bottom, rgb(248, 193, 120) 80%, transparent 100%);
}

.fav-btn {
  background: none;
  border: 2px solid var(--elem-color);
  color: var(--elem-color);
  border-radius: 20px;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s, color 0.2s, transform 0.2s;
  white-space: nowrap;
}

.fav-btn.active {
  background: var(--elem-color);
  color: #fff;
}

.fav-btn:hover { transform: scale(1.05); }

.info-col {
  flex: 1;
  min-width: 0;
  color: #373a53;
}

.char-name {
  font-family: 'Cinzel', serif;
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  color: #ab7104;
  margin: 0 0 4px;
}

.rarity {
  color: #fab72e;
  font-size: 1.1rem;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 16px;
  margin-bottom: 16px;
  font-size: 0.9rem;
}

.label {
  color: #aaa;
}

.element-text {
  color: var(--elem-color);
  font-weight: bold;
}

.description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
}

.section-title {
  color: #ab7104;
  font-size: 1rem;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(207, 161, 58, 0.3);
  padding-bottom: 4px;
}

.talent-item {
  margin-bottom: 12px;
}

.talent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.talent-unlock {
  font-size: 0.75rem;
  color: #aaa;
  font-style: italic;
}

.talent-desc {
  font-size: 0.82rem;
  color: #666;
  margin: 4px 0 0;
  line-height: 1.5;
}

.error, .loading {
  text-align: center;
  padding: 4rem;
  color: #888;
  font-size: 1.1rem;
}

@media (max-width: 600px) {
  .character-detail {
    flex-direction: column;
    align-items: center;
  }
}
</style>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { genshinService } from '../services/genshinapi'
import { useFavorites } from '../composables/useFavorites'

const route = useRoute()
const character = ref(null)
const error = ref(false)
const { favorites, toggleFavorite } = useFavorites()

const isFav = computed(() => character.value && favorites.value.includes(character.value.name))

onMounted(async () => {
  try {
    character.value = await genshinService.getCharacterById(route.params.id)
  } catch {
    error.value = true
  }
})
</script>
