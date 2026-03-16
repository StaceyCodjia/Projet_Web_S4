<template>
  <div :class="['card', vision.toLowerCase()]">
    
    <div class="card-header">
      <h2>{{ name }}</h2>
      <div class="rarity-stars">
        {{ '★'.repeat(Math.max(1, Number(rarity) || 5)) }}
      </div>
    </div>

    <div class="card-body">
      <div class="portrait-section">
        <img :src="pictureUrl" :alt="name" class="portrait" />
      </div>

      <div class="info-section">
        <div class="info-item">
          <img :src="getElementIcon(vision)" class="element-icon" />
          <span class="label">Vision:</span>
          <span class="value element-text">{{ vision }}</span>
        </div>
        <div class="info-item">
          <span class="label">Weapon:</span>
          <span class="value">{{ weapon }}</span>
        </div>
        <div class="info-item">
          <span class="label">Nation:</span>
          <span class="value">{{ nation }}</span>
        </div>
        <div class="info-item">
          <span class="label">Constellation:</span>
          <span class="value">{{ constellation }}</span>
        </div>
        <div class="info-item">
          <span class="label">Birthday:</span>
          <span class="value">{{ birthday }}</span>
        </div>
        <div class="info-item description-box">
          <span class="label">Description:</span>
          <span class="value">{{ description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card {
  --elem-color: #ece5d8;
  background: linear-gradient(135deg, #fffaf0, #fff8ec);
  border: 1px solid rgba(207, 161, 58, 0.45);
  box-shadow: 0 8px 24px rgba(186, 143, 59, 0.2), 0 2px 6px rgba(0, 0, 0, 0.12);
  border-radius: 14px;
  padding: 20px;
  color: #373a53;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  backdrop-filter: blur(10px);
}

.card.pyro { --elem-color: #ef797c; }
.card.hydro { --elem-color: #4cc9f0; }
.card.cryo { --elem-color: #98d8d8; }
.card.electro { --elem-color: #af8ec1; }
.card.anemo { --elem-color: #74c2a8; }
.card.geo { --elem-color: #fab72e; }
.card.dendro { --elem-color: #a5c83b; }

.card-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
}

h2 {
  font-size: 1.8rem;
  margin: 0;
  color: #ab7104; 
}

.rarity-stars {
  color: #fab72e;
  letter-spacing: 2px;
}

.card-body {
  display: flex;
  gap: 20px;
}

.portrait {
  width: 120px;
  height: auto;
  border-radius: 4px;
  mask-image: linear-gradient(to bottom, rgb(248, 193, 120) 80%, transparent 100%);
}

.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.label {
  color: #aaaaaa;
  margin-right: 10px;
  min-width: 80px;
}

.element-text {
  color: var(--elem-color);
  font-weight: bold;
  text-shadow: 0 0 5px var(--elem-color);
}

.element-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}


</style>
<script setup>
defineProps(['name', 'vision', 'weapon', 'pictureUrl', 'nation', 'constellation', 'birthday', 'description', 'rarity']);

const getElementIcon = (vision) => {
  return `https://genshin.jmp.blue/elements/${vision.toLowerCase()}/icon.png`
}
</script>