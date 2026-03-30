<template>
  <footer class="genshin-footer white-gold">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">Genshin Gallery</h3>
        <p>Project by Stacey Codjia - IMAC2 2026</p>
      </div>

      <div class="footer-elements">
        <img v-for="element in elements" 
             :key="element"
             :src="getElementIcon(element)" 
             :alt="element + ' icon'" 
             class="element-icon-original" />
      </div>

      <div class="footer-disclaimer">
        <p>© All rights reserved by HoYoverse. Other properties belong to their respective owners.</p>
        <p>This is a fan-made project and is not affiliated with HoYoverse.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.genshin-footer.white-gold {
  background-color: #ffffff; 
  color: #888; 
  padding: 20px 16px;
  margin-top: 60px;
  border-top: 2px solid rgba(211, 188, 142, 0.4);
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-title {
  color: #d3bc8e; 
  font-family: 'Cinzel', serif; 
  letter-spacing: 3px;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-size: clamp(0.9rem, 3vw, 1.2rem);
}

.footer-elements {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 2px 0;
}

.element-icon-original {
  width: clamp(18px, 4vw, 25px);
  height: auto;
}

.footer-disclaimer {
  color: #888;
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 8px;
}
</style>

<script setup>
const elements = [
  'pyro', 'hydro', 'anemo', 'electro', 'dendro', 'cryo', 'geo'
];

const getElementIcon = (elementName) => {
  return `https://genshin.jmp.blue/elements/${elementName}/icon.png`;
}
</script>
