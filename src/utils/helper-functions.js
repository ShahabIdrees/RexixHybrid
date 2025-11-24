import {placeholderImages} from '../assets/images';

// Global counter to ensure unique IDs across multiple calls
let globalPostCounter = 0;

export const generateDummyPosts = numPosts => {
  const posts = [];

  // Use local placeholder images
  const sampleImages = placeholderImages.slice(0, 4);

  for (let i = 0; i < numPosts; i++) {
    const randomRating = Math.random() * (5 - 3) + 3; // Rating between 3 and 5 for more realistic posts
    const postId = globalPostCounter++;
    posts.push({
      id: `post_${postId}`, // Ensure each ID is unique
      title: `Amazing Product ${postId + 1}!`,
      content: `This product exceeded my expectations. Highly recommend it! Post number ${
        postId + 1
      }.`,
      images: sampleImages,
      rating: randomRating,
    });
  }
  return posts;
};

// Global counter for products
let globalProductCounter = 0;

export const getDummyProducts = numProducts => {
  const products = [];

  // Use local placeholder images
  const sampleImages = placeholderImages.slice(0, 4);

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Beauty',
    'Toys',
  ];

  for (let i = 0; i < numProducts; i++) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const randomRating = (Math.random() * (5 - 1) + 1).toFixed(1); // Rating between 1 and 5
    const numberOfRatings = Math.floor(Math.random() * 1000) + 1; // Random number of ratings between 1 and 1000
    const productId = globalProductCounter++;

    products.push({
      id: `product_${productId}`, // Ensure each ID is unique
      name: `Product ${productId + 1}`,
      category: randomCategory,
      rating: randomRating,
      numberOfRatings: numberOfRatings,
      image: sampleImages[productId % sampleImages.length], // Cycle through images
    });
  }

  return products;
};
