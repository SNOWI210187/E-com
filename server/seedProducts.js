const mongoose = require("mongoose");
const Product = require("./models/Product"); // Adjust path as necessary

const seedProducts = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://praveenkumar1905108:Praveen@cluster0.nyodv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const products = [
      {
        name: "Wireless Headphones",
        price: 4999, // ₹4,999
        description:
          "High-quality wireless headphones with noise cancellation.",
        image:
          "https://www.cnet.com/a/img/resize/0aab7dd76e46a4b1cc166a059230ce737610c5ce/hub/2024/06/10/1df753ce-1519-4734-9e07-f8ed5bf776cc/sony-xm5-headphones.png?auto=webp&fit=crop&height=360&width=640", // Real working image link
        stock: 20,
      },
      {
        name: "Smartphone",
        price: 49999, // ₹49,999
        description:
          "Latest smartphone with advanced features and great battery life.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPEs70enZtpmKNrRlRcDtl9mTxU-zDEaLX_g&s", // Real working image link
        stock: 15,
      },
      {
        name: "Laptop",
        price: 79999, // ₹79,999
        description:
          "High-performance laptop suitable for gaming and productivity.",
        image:
          "https://i.pcmag.com/imagery/reviews/07f8FmuWzIKHir2YRAXsK7G-1.fit_lim.size_919x518.v1716757237.jpg", // Real working image link
        stock: 10,
      },
      {
        name: "Gaming Console",
        price: 49999, // ₹49,999
        description:
          "Next-gen gaming console with stunning graphics and fast performance.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBnWrTig1tTAgDRQpC0XwOuk1B9X5vr03E7w&s", // Real working image link
        stock: 8,
      },
      {
        name: "Smartwatch",
        price: 14999, // ₹14,999
        description:
          "Stylish smartwatch with fitness tracking and notifications.",
        image:
          "https://www.fastrack.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw3eab0d64/images/Fastrack/Catalog/38103AM02_1.jpg?sw=800&sh=800", // Real working image link
        stock: 25,
      },
      {
        name: "Bluetooth Speaker",
        price: 4999, // ₹4,999
        description: "Portable Bluetooth speaker with excellent sound quality.",
        image:
          "data:image/jpeg;base64,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", // Real working image link
        stock: 30,
      },
      {
        name: "Tablet",
        price: 24999, // ₹24,999
        description:
          "Lightweight tablet with a vibrant display and fast processor.",
        image:
          "https://lh3.googleusercontent.com/1RMSUKRJW276dIhiVspEooV2mlvm1LP9Dw7cZporTWNMdOOzTmY4SO-6cekMAS9Fqz0BrDxbbjCzKjMOd7TU8Fy3NRx92lm0s367USOBpduZzhGS0Tg", // Real working image link
        stock: 12,
      },
      {
        name: "Wireless Earbuds",
        price: 2999, // ₹2,999
        description:
          "Compact and convenient wireless earbuds with great sound.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcv3_mJX5tzc7bQGEwp22XT7HwWvxNjmJy4Q&s", // Real working image link
        stock: 18,
      },
      {
        name: "4K TV",
        price: 49999, // ₹49,999
        description: "Ultra HD 4K TV with vibrant colors and smart features.",
        image:
          "https://i.rtings.com/assets/products/q6Ln3OmS/lg-b4-oled/design-small.jpg?format=auto", // Real working image link
        stock: 5,
      },
      {
        name: "Digital Camera",
        price: 59999, // ₹59,999
        description:
          "DSLR camera with high resolution and versatile lens options.",
        image:
          "https://x.imastudent.com/content/0004905_sony-cybershot-dsc-rx10-mark-iv-digital-camera_500.jpeg", // Real working image link
        stock: 7,
      },
      {
        name: "Gaming Keyboard",
        price: 5999, // ₹5,999
        description: "Mechanical keyboard with customizable RGB lighting.",
        image: "https://cdn.mos.cms.futurecdn.net/XMDNCcbVWnrYj3zdapKrGb.jpg", // Real working image link
        stock: 50,
      },
      {
        name: "Gaming Mouse",
        price: 1999, // ₹1,999
        description: "Ergonomic gaming mouse with adjustable DPI settings.",
        image:
          "https://www.jiomart.com/images/product/original/rvg8p0r9y2/zebion-ninja-m-optical-usb-gaming-mouse-with-led-effect-black-product-images-orvg8p0r9y2-p596370523-3-202309062117.jpg?im=Resize=(420,420)", // Real working image link
        stock: 45,
      },
      {
        name: "Action Camera",
        price: 29999, // ₹29,999
        description: "Rugged action camera for capturing adventures in 4K.",
        image:
          "https://natureinnovate.in/cdn/shop/files/61FnJMobc4L._AC_SL1500.jpg?v=1727957530", // Real working image link
        stock: 10,
      },
      {
        name: "VR Headset",
        price: 39999, // ₹39,999
        description:
          "Immersive virtual reality headset for gaming and exploration.",
        image:
          "https://cdn.thewirecutter.com/wp-content/media/2024/10/vrheadsets-2048px-08406.jpg", // Real working image link
        stock: 6,
      },
      {
        name: "Electric Kettle",
        price: 2999, // ₹2,999
        description: "Fast-boiling electric kettle with automatic shutoff.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjg1HDtQzaCJz1jWJIupN-m2KxRdLpdzPuYQ&s", // Real working image link
        stock: 20,
      },
      {
        name: "Air Purifier",
        price: 9999, // ₹9,999
        description: "Efficient air purifier for clean and fresh indoor air.",
        image:
          "https://www.blueair.com/dw/image/v2/AASF_PRD/on/demandware.static/-/Sites-blueair-master-catalog/default/dwe52fda25/UI2024/3-in-1-Unit/16.png?sw=900&sh=900&sm=fit&q=100&strip=false", // Real working image link
        stock: 14,
      },
      {
        name: "Cordless Vacuum Cleaner",
        price: 17999, // ₹17,999
        description:
          "Powerful cordless vacuum cleaner for hassle-free cleaning.",
        image:
          "https://images.philips.com/is/image/philipsconsumer/vrs_5f84f3e82b5eb0cfb83ba03f690fca45925b1f01?wid=700&hei=700&$pnglarge$", // Real working image link
        stock: 9,
      },
      {
        name: "Smart Thermostat",
        price: 9999, // ₹9,999
        description: "Energy-efficient smart thermostat with remote control.",
        image: "https://cdn.mos.cms.futurecdn.net/Ek2kyrb7BqbAZXepGvvVYL.jpg", // Real working image link
        stock: 13,
      },
      {
        name: "Portable Charger",
        price: 1499, // ₹1,499
        description: "Compact portable charger with high capacity.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK9352hVpceubfwsasxn3NAgODhak7TA2bgQ&s", // Real working image link
        stock: 60,
      },
      {
        name: "Wireless Router",
        price: 4999, // ₹4,999
        description: "Fast wireless router for seamless internet connectivity.",
        image:
          "data:image/jpeg;base64,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", // Real working image link
        stock: 17,
      },
    ];

    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products); // Add default products
    console.log("Products seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding products:", err);
    process.exit(1);
  }
};

seedProducts();
