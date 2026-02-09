const BASE_URL = 'https://genshin.jmp.blue';

export const genshinService = {
  async getAllCharacters() {
    try {
      const response = await fetch(`${BASE_URL}/characters/all`);
      if (!response.ok) throw new Error('Erreur réseau');
      
      const data = await response.json();
      return data.map(char => ({
        id: char.name,
        name: char.name,
        vision: char.vision,
        weapon: char.weapon,
        nation: char.nation,
        constellation: char.constellation,
        pictureUrl: `${BASE_URL}/characters/${char.name.toLowerCase()}/card.png`
      }));
    } catch (error) {
      console.error("Service Error:", error);
      throw error;
    }
  }
};