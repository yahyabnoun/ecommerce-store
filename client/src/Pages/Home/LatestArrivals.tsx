import { useRef } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ui/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
        id: 1,
        name: "Swarovski All-Star Black Label Scratch Bling",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_907c1df2-5070-495d-b164-37af07ce8cb7_540x.jpg",
        price: 242,
        gender: "Mens",
        brand: "Nike",
        discount: 10,
    },
    {
        id: 2,
        name: "Air Jordan 'Bruce Lee'",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_21934328-eb88-4ef5-bfcb-5f409bad779e_540x.jpg",
        price: 150,
        gender: "Mens",
        brand: "Air Jordan",
        discount: 0,
    },
    {
        id: 8,
        name: "Rigorer AR1 'Valentine's Day'",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_522e5460-c917-45d1-b503-94a5c1c6a14e_540x.png",
        price: 150,
        gender: "Womens",
        brand: "Rigorer",
        discount: 15,
    },
    {
        id: 4,
        name: "adidas Yeezy Boost 350 V2 'Onyx'",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/HQ4540_540x.jpg",
        price: 150,
        gender: "Mens",
        brand: "adidas",
        discount: 0,
    },
    {
        id: 5,
        name: "ASICS Gel-1130 Exclusive",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_8850a9e8-9995-4e56-97ff-fbe38982440f_540x.jpg",
        price: 150,
        gender: "Mens",
        brand: "ASICS",
        discount: 0,
    },
    {
        id: 6,
        name: "Air Jordan 5 Retro OG",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_d6ab27bf-1b1d-4687-8925-06a8b59b1277_540x.jpg",
        price: 150,
        gender: "Kids",
        brand: "Air Jordan",
        discount: 25,
    },
    {
        id: 24,
        name: "A BATHING APE Bape STA Leather",
        image: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_b4988831-11c8-4cb8-a0f9-06acba8d2c8b_540x.jpg",
        price: 150,
        gender: "Mens",
        brand: "A Bathing Ape",
        discount: 0,
    },
];

export default function LatestArrivals() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -19 * window.innerWidth / 100, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 19 * window.innerWidth / 100, behavior: 'smooth' });
        }
    };

    return (
        <motion.section
            className="w-[100vw] px-[2.5vw] bg-gray-50 py-[10vh] relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <div className="relative mb-4">
                <h2 className="ibrand text-2xl md:text-3xl lg:text-4xl font-bold text-left text-black transform inline-block pl-[1vw] pt-2 ">
                    Latest Arrivals
                </h2>
                <div className="absolute top-0 right-4 flex gap-2 pr-[1vw] " >
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            scrollLeft();
                        }}
                        variant="outline"
                        className="p-2 hover:bg-lime-400/10"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            scrollRight();
                        }}
                        variant="outline"
                        className="p-2 hover:bg-lime-400/10"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex flex-row overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            >
                {sneakers.map((sneaker) => (
                    <motion.div
                        key={sneaker.id}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex-shrink-0 px-[1vw] snap-center"
                    >
                        <ProductCard
                            id={sneaker.id.toString()}
                            name={sneaker.name}
                            image={sneaker.image}
                            price={sneaker.price}
                            gender={sneaker.gender}
                            brand={sneaker.brand}
                            discount={sneaker.discount}
                        />
                    </motion.div>
                ))}
            </div>
            <div className="mt-4 flex justify-end  pr-[1vw] ">
                <a href="#" className="hover:text-lime-600 font-semibold">
                    See More
                </a>
            </div>
        </motion.section>
    );
}