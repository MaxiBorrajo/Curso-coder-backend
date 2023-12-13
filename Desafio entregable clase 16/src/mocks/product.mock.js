import { faker } from "@faker-js/faker";

function generateRandomGPU() {
  return `${faker.} ${faker.random.word()} ${faker.random.number(8)}GB ${faker.random.number({
    min: 1,
    max: 4,
  })}GHz`;
}

function generateRandomCPU() {
  return `${faker.random.arrayElement([
    "Intel",
    "AMD",
  ])} ${faker.random.word()} ${faker.random.number({
    min: 2,
    max: 16,
  })} cores ${faker.random.number({ min: 2, max: 5 })}GHz`;
}

export const generateProduct = () => {
  return {
    id: faker.number.int({ min: 0 }),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    discount: faker.number.int({ min: 0 }),
    release_date: faker.date.anytime(),
    url_front_page: faker.image.url,
    front_page_public_id: faker.string.alphanumeric(15),
    popularity: faker.number.int({ min: 0 }),
    CPU: generateRandomCPU(),
    RAM: faker.number.int({ min: 0 }),
    memory: faker.number.int({ min: 0 }),
    GPU: generateRandomGPU(),
    idDeveloper: faker.number.int({ min: 0 }),
  };
};
