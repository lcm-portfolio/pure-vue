import makeup from "./makeup.json" assert { type: "json" };
import axios from "axios";
import fs from "fs";

const images = [
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
  "https://images.unsplash.com/photo-1515688594390-b649af70d282?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1106&q=80",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80",
  "https://images.unsplash.com/photo-1503236823255-94609f598e71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
  "https://images.unsplash.com/photo-1512207855369-643452a63d46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1083&q=80",
  "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=881&q=80",
  "https://images.unsplash.com/photo-1590156546946-ce55a12a6a5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  "https://images.unsplash.com/photo-1591375462077-800a22f5fba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ1fHxtYWtldXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1615396899839-c99c121888b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1559747425-1644c651a403?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1571875257727-256c39da42af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
  "https://images.unsplash.com/photo-1531646317777-0619c7c5d1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1590156423742-3c58d6b9d605?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
];

const categories = [
  "lipstick",
  "eyeliner",
  "eyeshadow",
  "foundation",
  "mascara",
  "blush",
  "bronzer",
  "nail polish",
  "lip gloss",
  "lip liner",
  "eyebrow",
  "false eyelashes",
];
const brands = [
  "coulorpop",
  "nyx",
  "anabelle",
  "dior",
  "maybelline",
  "covergirl"]

const randomBrand = (brand) => {
  return brand[Math.floor(Math.random() * brand.length)];
};

//fonction qui choisi un élément aléatoire dans un tableau
const randomArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

//fonction qui choisi un prix si le prix est 0

const anntiZero = (price) => {
  if (price === 0) {
    return randomPrice(1, 100);
  } else {
    return Number(price);
  }
};

// Fonction pour générer un prix aléatoire
const randomPrice = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2);
};

// Fonction pour générer une note aléatoire
const randomRating = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(1);
};

const generatePrice = randomPrice(1, 100);
const generateRating = randomRating(1, 5);

const filterData = makeup.map((item) => {
  return {
    ...item,
    // price: anntiZero(Number(item.price)) || randomPrice(1, 100),
    // rating: Number(item.rating) || randomRating(1, 5),
    // category: item.category || randomArray(categories),
    // image_link: item.image_link || randomArray(images),
    brand: item.brand || randomBrand(brands),
  };
});

// const replaceImageLinks = async () => {
//   for (const item of filterData) {
//     try {
//       await axios.get(item.image_link);
//       console.log(`Le lien pour l'article ${item.id} est correct.`);
//     } catch (err) {
//       // Si une erreur se produit, remplacez le lien par une image aléatoire
//       item.image_link = randomArray(images);
//       console.log(`Image pour l'article ${item.id} remplacée par une image par défaut.`);
//     }
//   }
// };

const generateJsonFile = () => {
  fs.writeFileSync("./makeupFiltered.json", JSON.stringify(filterData, null, 2));
};

(async () => {
  try {
    // await replaceImageLinks();
    generateJsonFile();
    console.log("JSON file generated successfully.");
  } catch (err) {
    console.error("An error occurred during processing:", err);
  }
})();
