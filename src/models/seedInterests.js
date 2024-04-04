const { Interest } = require('./interestModel');

async function seedInterests() {
  try {
    await Interest.sync({ force: true });

    const interestsData = [
      { name: 'Jeux-vidéos' },
      { name: 'Cuisine' },
      { name: 'Bons plans' },
      { name: 'Animaux' },
      { name: 'Science' },
      { name: 'Cinéma' },
      { name: 'Littérature' },
      { name: 'Histoire' },
      { name: 'Art' },
      { name: 'Bien-être' },
      { name: 'Humour' },
      { name: 'Sport' },
      { name: 'Mode' },
      { name: 'Actualités' },
      { name: 'Recherche' },
      { name: 'Question' },
    ];

    await Interest.bulkCreate(interestsData);

    console.log('Interests seeded successfully');
  } catch (error) {
    console.error('Error seeding interests:', error);
  }
}

seedInterests();
