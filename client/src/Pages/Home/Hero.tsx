import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import sneakerImage1 from '/imgs/hero1.jpg';
import sneakerImage2 from '/imgs/hero2.jpg';
import sneakerImage3 from '/imgs/hero3.jpg';
import Loader from '@/components/ui/Loader';

const sneakerImages = [sneakerImage1, sneakerImage2, sneakerImage3];

const imageVariants = {
    initial: {
        clipPath: "inset(0% 0% 100% 0%)",
        filter: "blur(5px) contrast(150%)"
    },
    animate: {
        clipPath: ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
        filter: ["blur(5px) contrast(150%)", "blur(2px) contrast(120%)", "blur(0px) contrast(100%)", "blur(0px) contrast(100%)"],
        transition: {
            duration: 0.8,
            times: [0, 0.3, 0.6, 1],
            ease: "easeInOut",
            repeat: 0
        }
    },
    exit: {
        clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)", "inset(0% 0% 100% 0%)"],
        filter: ["blur(0px) contrast(100%)", "blur(2px) contrast(120%)", "blur(5px) contrast(150%)", "blur(5px) contrast(150%)"],
        transition: {
            duration: 0.8,
            times: [0, 0.3, 0.6, 1],
            ease: "easeInOut",
            repeat: 0
        }
    }
};

const nameDescVariants = {
    initial: {
        y: 20,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
    exit: {
        y: -20,
        opacity: 0,
        transition: {
            duration: 0.6,
            ease: "easeIn"
        }
    }
};

const heroVariants = {
    initial: {
        y: -50
    },
    animate: {
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

const leftSectionVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } }
};

const middleSectionVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.4 } }
};

const rightSectionVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.6 } }
};

const sneakers = [
    {
        id: 54,
        name: "Nike Air Max 1/97 'Sean Wotherspoon'",
        brand: "Nike",
        gender: "Mens",
        discount: 20,
        mainImage: sneakerImages[0],
        cardImage: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_0b300cd0-d7bf-49a5-a9d8-0b0b522bb6ec_1920x.jpg",
        sizes: [
            { size: 38, price: 522.0, items_left: 5 },
            { size: 39, price: 542.0, items_left: 5 },
            { size: 40, price: 562.0, items_left: 3 },
            { size: 41, price: 582.0, items_left: 0 },
            { size: 42, price: 602.0, items_left: 1 },
            { size: 43, price: 622.0, items_left: 2 },
            { size: 44, price: 642.0, items_left: 2 }
        ],
        details: {
            ReleaseDate: "2018-03-25",
            Color: "MULTI-COLOR",
            Nickname: "Sean Wotherspoon",
            Description: "A vibrant hybrid blending Air Max 1 and 97, designed by Sean Wotherspoon for Air Max Day 2018."
        }
    },
    {
        id: 55,
        name: "Air Jordan 1 Mid SE 'Iridescent Trim'",
        brand: "Air Jordan",
        gender: "Womens",
        mainImage: sneakerImages[1],
        cardImage: "https://cdn.shopify.com/s/files/1/0603/3031/1875/products/main-square_dfc59898-fe47-44cf-aff8-b131dafd2f73_1920x.jpg",
        sizes: [
            { size: 38, price: 254.0, items_left: 5 },
            { size: 39, price: 274.0, items_left: 4 },
            { size: 40, price: 294.0, items_left: 2 },
            { size: 41, price: 314.0, items_left: 1 },
            { size: 42, price: 334.0, items_left: 4 },
            { size: 43, price: 354.0, items_left: 0 },
            { size: 44, price: 374.0, items_left: 5 }
        ],
        details: {
            ReleaseDate: "2020-01-14",
            Color: "White",
            Nickname: "Iridescent Trim",
            Description: "A sleek women’s Air Jordan 1 Mid with iridescent accents, offering a fresh twist on a classic."
        }
    },
    {
        id: 56,
        name: "Air Jordan 1 Low 'Gym Red'",
        brand: "Air Jordan",
        gender: "Mens",
        mainImage: sneakerImages[2],
        cardImage: "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_3d9ea46e-97dc-4243-b2e3-e48c647061a9_1920x.jpg",
        sizes: [
            { size: 38, price: 202.0, items_left: 0 },
            { size: 39, price: 222.0, items_left: 4 },
            { size: 40, price: 242.0, items_left: 3 },
            { size: 41, price: 262.0, items_left: 1 },
            { size: 42, price: 282.0, items_left: 2 },
            { size: 43, price: 302.0, items_left: 3 },
            { size: 44, price: 322.0, items_left: 5 }
        ],
        details: {
            ReleaseDate: "2020-03-22",
            Color: "Red",
            Nickname: "Gym Red",
            Description: "A bold Air Jordan 1 Low in striking Gym Red, perfect for standout street style."
        }
    }
];

function HeroSection() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        const interval = setInterval(() => {
            setSelectedIndex((prev) => (prev + 1) % sneakers.length);
        }, 4000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    const currentSneaker = sneakers[selectedIndex];
    const minPrice = Math.min(...currentSneaker.sizes.map(size => size.price));
    const discountedPrice = currentSneaker.discount ? minPrice * (1 - currentSneaker.discount / 100) : null;

    return (
        <motion.div
            className="relative h-[92vh] w-[100vw] bg-gray-50 flex items-center overflow-hidden"
            variants={heroVariants}
            initial="initial"
            animate="animate"
        >
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <motion.div
                        className="w-[45vw] h-[88vh] flex flex-col justify-between pt-[2vh] px-2"
                        variants={leftSectionVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.div className="text-center select-none" initial="initial" animate="animate">
                            <h1 className="ibrand text-6xl md:text-8xl font-extrabold text-black tracking-tight">
                                Sneakers <span className="text-lime-400">X</span>
                            </h1>
                        </motion.div>
                        <div className="flex-grow flex flex-col justify-center items-center ibrand">
                            <motion.h2
                                className="text-lg md:text-xl text-black text-center mt-2"
                                variants={nameDescVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                key={`name-${selectedIndex}`}
                            >
                                {currentSneaker.name}
                            </motion.h2>
                            <motion.p
                                className="text-base md:text-lg text-black max-w-md text-center mt-8"
                                variants={nameDescVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                key={`desc-${selectedIndex}`}
                            >
                                {currentSneaker.details.Description}
                            </motion.p>
                        </div>
                        <motion.button className="flex-grow flex items-end">
                            <div className="w-[80%] ml-[10%] relative bg-lime-400 rounded-lg text-black font-semibold px-6 py-3 hover:bg-lime-500 transition-colors flex items-center justify-between">
                                <span className="text-sm">{currentSneaker.gender}</span>
                                <span className="text-sm absolute left-1/2 transform -translate-x-1/2">
                                    <button onClick={() => console.log("Shop Now clicked")}>
                                        Shop Now
                                    </button>
                                </span>
                                <span className="text-sm">
                                    {discountedPrice ? (
                                        <>
                                            <span className="line-through text-gray-600 mr-2">{minPrice}</span>
                                            <span>{discountedPrice.toFixed(2)} DH</span>
                                        </>
                                    ) : (
                                        `${minPrice} DH`
                                    )}
                                </span>
                            </div>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        className="w-[40%] h-[88vh] flex items-center justify-center"
                        variants={middleSectionVariants}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.div
                            className="w-full h-full rounded-lg overflow-hidden"
                            variants={imageVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={selectedIndex}
                            style={{
                                backgroundImage: `url(${currentSneaker.mainImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                    </motion.div>
                    <motion.div
                        className="w-[15%] h-[88vh] flex flex-col gap-[2vh] px-7"
                        variants={rightSectionVariants}
                        initial="initial"
                        animate="animate"
                    >
                        {sneakers.map((sneaker, index) => {
                            const minPrice = Math.min(...sneaker.sizes.map(size => size.price));
                            const discountedPrice = sneaker.discount ? minPrice * (1 - sneaker.discount / 100) : null;
                            return (
                                <motion.div
                                    key={sneaker.id}
                                    className={`h-[28vh] w-[100%] bg-white rounded-lg border ${index === selectedIndex ? "border-lime-400" : "border-gray-300 opacity-25"} transition-colors cursor-pointer mx-auto relative`}
                                    initial="initial"
                                    animate="animate"
                                    onClick={() => setSelectedIndex(index)}
                                >
                                    {sneaker.discount && (
                                        <div
                                            className={`top-2 right-2 bg-lime-400 text-black text-xs font-semibold px-2 py-1 rounded-full ${index !== selectedIndex ? "absolute z-10 grayscale" : "absolute z-10"}`}
                                        >
                                            -{sneaker.discount}%
                                        </div>
                                    )}
                                    <img
                                        src={sneaker.cardImage}
                                        alt={sneaker.name}
                                        className={`w-[80%] ml-[10%] h-2/3 object-cover rounded-t-lg z-0 ${index !== selectedIndex ? "grayscale" : ""}`}
                                    />
                                    <div className="p-2">
                                        <h3 className={`text-xs font-semibold truncate ${index !== selectedIndex ? "text-gray-500" : "text-black"}`}>{sneaker.name}</h3>
                                        <div className="flex justify-between items-center mt-1">
                                            <p className={`text-[10px] ${index !== selectedIndex ? "text-gray-500" : "text-black"}`}>{sneaker.brand}</p>
                                            <p className={`text-xs font-medium ${index !== selectedIndex ? "text-gray-500" : "text-black"}`}>
                                                {discountedPrice ? (
                                                    <>
                                                        <span className="line-through mr-2">{minPrice}</span>
                                                        <span>{discountedPrice.toFixed(2)} DH</span>
                                                    </>
                                                ) : (
                                                    `${minPrice} DH`
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </>
            )}
        </motion.div>
    );
}

export default HeroSection;