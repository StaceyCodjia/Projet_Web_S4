<template>
  <header class="gallery-header">
    <div class="banner">
      <h1 class="main-title">Genshin Characters Gallery</h1>
    </div>
    <div class="title-underline"></div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');

.gallery-header {
  min-height: 200px;
  height: 35vh;
  padding: 30px 16px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('https://i.imgur.com/eH9ErgW.jpg');
  background-size: cover;
  background-position: center;
}

.banner {
  padding: 16px 24px;
  border-radius: 10px;
  background-color: rgba(1, 56, 115, 0.5);
  border: 1px solid rgba(211, 188, 142, 0.3);
  backdrop-filter: blur(5px);
  max-width: 90%;
}

.main-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(1.4rem, 5vw, 3.5rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: clamp(2px, 1vw, 6px);
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

@media (max-width: 480px) {
  .gallery-header {
    height: auto;
    padding: 24px 12px 16px;
  }

  .banner {
    padding: 12px 16px;
  }
}
</style>
