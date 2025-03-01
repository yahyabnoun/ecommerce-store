import { Button } from "@/components/ui/button";
import { HeartIcon, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    id: string;
    name: string;
    image: string;
    price: number;
    gender: string;
    brand: string;
    discount?: number;
}

export default function ProductCard({ id, name, image, price, gender, brand, discount = 0 }: ProductCardProps) {
    const discountedPrice = discount ? price * (1 - discount / 100) : null;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/${id}`);
    };

    return (
        <div 
            className="w-[17vw] space-y-4 cursor-pointer"
            onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
            }}
        >
            <figure className="relative pt-[100%]">
                <img
                    className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
                    src={image}
                    alt={name}
                />
                {discount > 0 && (
                    <div className="absolute top-2 right-2 bg-lime-400 text-black text-xs font-semibold px-2 py-1 rounded-full">
                        -{discount}%
                    </div>
                )}
            </figure>
            <div className="flex justify-between">
                <div className="flex-1 truncate">
                    <h3 className="text-lg truncate">
                        <p>{name}</p>
                    </h3>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">{gender} | {brand}</p>
                        <p className="text-sm font-semibold">
                            {discountedPrice ? (
                                <>
                                    <span className="line-through text-gray-500 mr-1">{price.toFixed(2)}</span>
                                    <span>{discountedPrice.toFixed(2)} DH</span>
                                </>
                            ) : (
                                `${price.toFixed(2)} DH`
                            )}
                        </p>
                    </div>
                </div>
            </div>
            <div 
                className="flex gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <Button variant="outline" size="icon" className="flex-shrink-0">
                    <HeartIcon className="size-4" />
                </Button>
                <Button variant="outline" className="w-full">
                    <PlusIcon className="size-4 me-1" /> Add to Cart
                </Button>
            </div>
        </div>
    );
}