<template>
  <GalleryHeader />

  <nav class="main-nav">
    <RouterLink to="/" class="nav-link">Galerie</RouterLink>
    <RouterLink to="/favorites" class="nav-link">
      Favoris
      <span v-if="favorites.length > 0" class="fav-count">{{ favorites.length }}</span>
    </RouterLink>
  </nav>

  <RouterView />

  <GalleryFooter />
</template>

<style scoped>
.main-nav {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(1, 56, 115, 0.08);
  border-bottom: 1px solid rgba(211, 188, 142, 0.2);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  border-radius: 20px;
  text-decoration: none;
  color: #d3bc8e;
  font-weight: bold;
  font-size: 0.95rem;
  transition: background 0.2s, color 0.2s;
}

.nav-link:hover {
  background: rgba(211, 188, 142, 0.15);
}

.nav-link.router-link-active {
  background: rgba(211, 188, 142, 0.25);
  color: #ab7104;
}

.fav-count {
  background: #e05f7f;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
import GalleryHeader from './components/GalleryHeader.vue'
import GalleryFooter from './components/GalleryFooter.vue'
import { useFavorites } from './composables/useFavorites'

const { favorites } = useFavorites()
</script>
