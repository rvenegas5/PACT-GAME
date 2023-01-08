const animals = {
  all: 1,
  birds: 3,
  cat: 12,
  clownfish: 2,
  fish: 2,
  dog: 11,
  hamster: 3,
  monkey: 4,
  parrot: 3,
  rabbit: 3,
  stingray: 2
};

function generateRandomPath() {
  const animal = Object.keys(animals)[
    Math.floor(Math.random() * Object.keys(animals).length)
  ];
  const number = Math.floor(Math.random() * animals[animal]) + 1;
  return `assets/cardsImages/pets/${animal}-${number}.png`;
}

export { generateRandomPath };
