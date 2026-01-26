<template>
  <div id="artefact-card">
    <img
      id="artefact-image"
      src="https://lagazettedeteyvat.fr/wp-content/uploads/2026/01/Aubade-dastre-et-de-lune.webp"
      alt="Artefact Image"
    />
    <div id="artefact-description">
      <h3>Aubade d'astre et de lune</h3>
      <p className="artefact-description-line">Set 2 pièces : Maitrise élémentaire de 80 pts</p>
      <p className="artefact-description-line">Set 4 pièces : Dégats sélène + 20%</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
#artefact-card {
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin: 10px;
}

#artefact-image {
  width: 100%;
  height: 105px;
  object-fit: cover;
}

#artefact-description {
  padding: 10px;
  color: #000000;
}

#artefact-description h3 {
  font-size: 18px;
  margin: 0;
}

.artefact-description-line {
  color: #353535;
  font-size: 12px;
  margin: 5px 0;
}
</style>