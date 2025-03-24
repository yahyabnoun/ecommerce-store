import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import ProductCard from '@/components/ui/ProductCard';
import Footer from '../Home/Footer';
import { Heart, ShoppingCart } from 'lucide-react';

interface SneakerDetails {
    id: number;
    name: string;
    brand: string;
    gender: string;
    SKU: string;
    Color: string;
    discount: number;
    mainImage: string;
    secondaryImages: string[];
    details: {
        Model: string;
        ReleaseDate: string;
        Series: string;
        Occasion: string;
        Colorway: string;
        Color: string;
    };
    sizes: { size: number; price: number; items_left: number }[];
    is_in_inventory: boolean;
    items_left: number;
}

const sneakerData: SneakerDetails = {
    "id": 10,
    "name": "Air Jordan 1 Low 'Lucky Green' 553558-065",
    "brand": "Air Jordan",
    "gender": "Mens",
    "SKU": "553558-065",
    "Color": "green",
    "discount": 10,
    "mainImage": "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/553558-065_201_540x.jpg",
    "secondaryImages": [
        "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/4_88c728dc-5a29-40e4-a104-6fa35539064f_540x.jpg",
        "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/3_f60f0aff-62fe-469c-a461-4c91d7bb55d5_540x.jpg",
        "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/5_67fa010a-3124-46ea-ac76-a06265e8b310_540x.jpg",
        "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/1_636d12b5-2d72-4e23-bbbf-d84c158b09e4_540x.jpg",
        "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/2_6b680548-44d0-4976-8776-4b140f972668_540x.jpg"
    ],
    "details": {
        "Model": "553558-065",
        "ReleaseDate": "2023-03-28",
        "Series": "Air Jordan 1 Low",
        "Occasion": "lifestyle",
        "Color": "green",
        "Colorway": "BLACK/BLACK-LUCKY GREEN-WHITE"
    },
    "sizes": [
        {
            "size": 38,
            "price": 150,
            "items_left": 1
        },
        {
            "size": 39,
            "price": 170,
            "items_left": 1
        },
        {
            "size": 40,
            "price": 190,
            "items_left": 1
        },
        {
            "size": 41,
            "price": 210,
            "items_left": 0
        },
        {
            "size": 42,
            "price": 230,
            "items_left": 0
        },
        {
            "size": 43,
            "price": 250,
            "items_left": 2
        },
        {
            "size": 44,
            "price": 270,
            "items_left": 1
        }
    ],
    "is_in_inventory": true,
    "items_left": 6
}

interface Sneaker {
    id: number;
    name: string;
    image: string;
    price: number;
    gender: string;
    brand: string;
    discount: number;
}

export const sneakers: Sneaker[] = [
    {
        id: 2,
        name: "Air Jordan 'Bruce Lee'",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_21934328-eb88-4ef5-bfcb-5f409bad779e_540x.jpg",
        price: 150,
        gender: "Mens",
        brand: "Air Jordan",
        discount: 10,
    }, {
        id: 11,
        name: "Air Jordan 1 Low OG 'Mocha' CZ0790-102",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_12105aa3-067c-457a-8831-b356558a7fda_540x.jpg",
        price: 150,
        gender: "Mens",
        brand: "Air Jordan",
        discount: 0,
    },
    {
        id: 12,
        name: "Air Jordan 1 Low 'Royal Toe' 553558-140",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_c52df379-0a01-439f-b057-b575a55443fe_540x.jpg",
        price: 150,
        gender: "Mens",
        brand: "Air Jordan",
        discount:20,
    },
    {
        id: 14,
        name: "Air Jordan 1 Retro High OG 'Reverse Laney'",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_824762ea-87e5-4247-ae36-4cea0574ff4a_540x.jpg",
        price: 150, 
        gender: "Kids",
        brand: "Air Jordan",
        discount: 0,
    },
    {
        id: 15,
        name: "Air Jordan 1 Low SE 'Legend Light Brown' HF1567-200",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_d486e73e-5dc5-4c80-86a5-1681e8b98203_540x.jpg",
        price: 150, 
        gender: "Mens",
        brand: "Air Jordan",
        discount: 0,
    }
];

export default function ProductDetails() {
    const [selectedImage, setSelectedImage] = useState(sneakerData.mainImage);
    const [selectedSize, setSelectedSize] = useState(sneakerData.sizes[0]); // Default to first size since all are out of stock

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const calculateDiscountedPrice = (price: number, discount: number) => {
        return discount > 0 ? Math.round(price * (1 - discount / 100)) : price;
    };

    const isOutOfStock = sneakerData.items_left === 0;

    return (
        <>
            <motion.div
                className="min-h-screen bg-white p-4 md:p-8"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants} className="mb-6 text-black">
                    <p className="text-sm tracking-wide">
                        Sneakers &gt; Men &gt; Air Jordan 1 Low 'Gym Red'
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="w-full h-[400px] bg-white rounded-lg overflow-hidden flex justify-center">
                            <motion.img
                                key={selectedImage}
                                src={selectedImage}
                                alt={sneakerData.name}
                                className="w-[100%] h-full object-contain"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <div className="flex justify-center gap-2 overflow-x-auto pb-2">
                            {[sneakerData.mainImage, ...sneakerData.secondaryImages].map((img, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${selectedImage === img ? 'border-lime-400' : 'border-gray-200'}`}
                                >
                                    <img src={img} alt={`View ${index}`} className="w-full h-full object-cover" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-black tracking-tight">{sneakerData.name}</h1>
                            <div className="flex gap-4 text-gray-600">
                                <p>Brand: <span className="font-medium">{sneakerData.brand}</span></p>
                                <p>Gender: <span className="font-medium">{sneakerData.gender}</span></p>
                            </div>
                        </div>

                        <div className="border-t border-b py-4 space-y-2">
                            <h3 className="text-lg font-semibold text-black">Product Details</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <p><span className="text-gray-600">Model:</span> {sneakerData.details.Model}</p>
                                <p><span className="text-gray-600">Release:</span> {sneakerData.details.ReleaseDate}</p>
                                <p><span className="text-gray-600">Series:</span> {sneakerData.details.Series}</p>
                                <p><span className="text-gray-600">Occasion:</span> {sneakerData.details.Occasion}</p>
                                <p><span className="text-gray-600">Colorway:</span> {sneakerData.details.Colorway}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-black">Select Size</h3>
                            <div className="flex flex-wrap gap-2">
                                {sneakerData.sizes.map((size) => (
                                    <Button
                                        key={size.size}
                                        variant={size.items_left > 0 && selectedSize.size === size.size ? "default" : "outline"}
                                        className={`relative px-14 py-2 text-sm font-medium ${size.items_left > 0
                                            ? selectedSize.size === size.size
                                                ? 'bg-lime-400 hover:bg-lime-500 text-black'
                                                : 'hover:bg-gray-100 text-black border-gray-200'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
                                            }`}
                                        onClick={() => size.items_left > 0 && setSelectedSize(size)}
                                        disabled={size.items_left === 0}
                                    >
                                        {size.size}
                                        {size.items_left === 0 && (
                                            <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                Out of Stock
                                            </span>
                                        )}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                className="w-[20%] bg-black text-white hover:bg-gray-800"
                                size="lg"
                                disabled={isOutOfStock}
                            >
                                {sneakerData.discount > 0 && (
                                    <span className="line-through text-gray-400 mr-2">{selectedSize.price} DH</span>
                                )}
                                {calculateDiscountedPrice(selectedSize.price, sneakerData.discount)} DH
                            </Button>
                            <Button
                                className="w-[40%] bg-black text-white hover:bg-gray-800 relative group"
                                size="lg"
                                disabled={isOutOfStock}
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                                {isOutOfStock && (
                                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        Out of Stock
                                    </span>
                                )}
                            </Button>
                            <Button
                                variant="outline"
                                className="w-[40%] border-lime-400 bg-lime-400 hover:bg-lime-300 hover:text-black"
                                size="lg"
                                disabled={isOutOfStock}
                            >
                                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    className="mt-[20vh] mb-[10vh] "
                >
                    <h2 className="text-2xl font-bold mb-4 text-black">More Air Jordan Sneakers</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {sneakers.map((sneaker) => (
                            <motion.div key={sneaker.id} variants={itemVariants}>
                                <ProductCard
                                    id={sneaker.id.toString()}
                                    name={sneaker.name}
                                    image={sneaker.image}
                                    price={calculateDiscountedPrice(sneaker.price, sneaker.discount)}
                                    gender={sneaker.gender}
                                    brand={sneaker.brand}
                                    discount={sneaker.discount}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
            <Footer />
        </>
    );
}