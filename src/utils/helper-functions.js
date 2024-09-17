export const generateDummyPosts = numPosts => {
  const posts = [];

  const sampleImages = [
    'https://via.placeholder.com/600x400.png?text=Image+1',
    'https://via.placeholder.com/600x400.png?text=Image+2',
    'https://via.placeholder.com/600x400.png?text=Image+3',
    'https://via.placeholder.com/600x400.png?text=Image+4',
  ];
  let postCounter = 0;
  for (let i = 0; i < numPosts; i++) {
    posts.push({
      id: `${postCounter++}`, // Ensure each ID is unique
      title: `Amazing Product ${postCounter}!`,
      content: `This product exceeded my expectations. Highly recommend it! Post number ${postCounter}.`,
      images: sampleImages,
    });
  }
  return posts;
};

export const getDummyProducts = numProducts => {
  const products = [];

  const sampleImages = [
    'https://via.placeholder.com/600x400.png?text=Product+1',
    'https://via.placeholder.com/600x400.png?text=Product+2',
    'https://via.placeholder.com/600x400.png?text=Product+3',
    'https://via.placeholder.com/600x400.png?text=Product+4',
  ];

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Beauty',
    'Toys',
  ];

  let productCounter = 0;

  for (let i = 0; i < numProducts; i++) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const randomRating = (Math.random() * (5 - 1) + 1).toFixed(1); // Rating between 1 and 5
    const numberOfRatings = Math.floor(Math.random() * 1000) + 1; // Random number of ratings between 1 and 1000

    products.push({
      id: `${productCounter++}`, // Ensure each ID is unique
      name: `Product ${productCounter}`,
      category: randomCategory,
      rating: randomRating,
      numberOfRatings: numberOfRatings,
      image: sampleImages[Math.floor(Math.random() * sampleImages.length)],
    });
  }

  return products;
};
