import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Footer() {
    return (
        <motion.footer
            className="bg-black  px-[2.5vw]  text-white pt-12 pb-8"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="containermx-auto px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-12 pb-6">
                    <div>
                        <motion.h3
                            className="text-2xl font-bold mb-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-lime-400">Sneakers</span>
                            <span className="text-lime-400">X</span>
                        </motion.h3>
                        <p className="text-gray-400">
                            Your premier destination for authentic sneakers. From rare drops to daily wears, we've got you covered.
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-lg font-semibold mb-4 text-lime-400 text-center">Quick Links</h4>
                        <div className="flex flex-wrap gap-6 justify-center">
                            {["Home", "Mens", "Womens", "Kids", "About"].map((link) => (
                                <a
                                    key={link}
                                    href={`/${link.toLowerCase()}`}
                                    className="text-gray-400 hover:text-lime-400 transition-colors text-sm font-medium"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-lime-400">Follow Us</h4>
                        <div className="flex gap-4 mb-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-lime-400 transition-colors"
                                aria-label="Facebook"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 400 800"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M272.852 800V440H382.147L400 280H272.852V202.07C272.852 160.87 273.904 120 331.476 120H389.788V5.60547C389.788 3.88547 339.7 0 289.027 0C183.2 0 116.936 66.2878 116.936 188.008V280H0V440H116.936V800H272.852Z"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-lime-400 transition-colors"
                                aria-label="Instagram"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 734 734"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M367 567C477.457 567 567 477.457 567 367C567 256.543 477.457 167 367 167C256.543 167 167 256.543 167 367C167 477.457 256.543 567 367 567ZM367 500.333C440.637 500.333 500.333 440.637 500.333 367C500.333 293.362 440.637 233.667 367 233.667C293.362 233.667 233.667 293.362 233.667 367C233.667 440.637 293.362 500.333 367 500.333Z"
                                    />
                                    <path d="M567 133.667C548.59 133.667 533.667 148.591 533.667 167C533.667 185.409 548.59 200.333 567 200.333C585.41 200.333 600.333 185.409 600.333 167C600.333 148.591 585.41 133.667 567 133.667Z" />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M22.1319 109.535C0.333252 152.318 0.333252 208.323 0.333252 320.333V413.667C0.333252 525.677 0.333252 581.683 22.1319 624.463C41.3066 662.097 71.9026 692.693 109.535 711.867C152.318 733.667 208.323 733.667 320.333 733.667H413.667C525.677 733.667 581.683 733.667 624.463 711.867C662.097 692.693 692.693 662.097 711.867 624.463C733.667 581.683 733.667 525.677 733.667 413.667V320.333C733.667 208.323 733.667 152.318 711.867 109.535C692.693 71.9027 662.097 41.3067 624.463 22.132C581.683 0.333374 525.677 0.333374 413.667 0.333374H320.333C208.323 0.333374 152.318 0.333374 109.535 22.132C71.9026 41.3067 41.3066 71.9027 22.1319 109.535ZM413.667 67H320.333C263.228 67 224.408 67.052 194.403 69.5034C165.175 71.8914 150.228 76.2197 139.801 81.5324C114.713 94.3157 94.3156 114.713 81.5322 139.801C76.2196 150.228 71.8913 165.175 69.5033 194.403C67.0519 224.408 66.9999 263.228 66.9999 320.333V413.667C66.9999 470.773 67.0519 509.59 69.5033 539.597C71.8913 568.827 76.2196 583.773 81.5322 594.2C94.3156 619.287 114.713 639.683 139.801 652.467C150.228 657.78 165.175 662.11 194.403 664.497C224.408 666.947 263.228 667 320.333 667H413.667C470.773 667 509.59 666.947 539.597 664.497C568.827 662.11 583.773 657.78 594.2 652.467C619.287 639.683 639.683 619.287 652.467 594.2C657.78 583.773 662.11 568.827 664.497 539.597C666.947 509.59 667 470.773 667 413.667V320.333C667 263.228 666.947 224.408 664.497 194.403C662.11 165.175 657.78 150.228 652.467 139.801C639.683 114.713 619.287 94.3157 594.2 81.5324C583.773 76.2197 568.827 71.8914 539.597 69.5034C509.59 67.052 470.773 67 413.667 67Z"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-lime-400 transition-colors"
                                aria-label="TikTok"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 652 750"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                >
                                    <path d="M342.145 0.625002C383.07 2.37487e-06 423.695 0.325 464.295 0C465.645 50.775 486.245 96.475 519.02 130.325L518.97 130.275C554.245 162.05 600.145 182.65 650.745 186.15L651.445 186.2V312.1C603.645 310.9 558.695 299.875 518.17 280.925L520.22 281.775C500.62 272.35 484.045 262.675 468.295 251.875L469.595 252.725C469.295 343.95 469.895 435.175 468.97 526.075C466.395 572.4 450.995 614.65 426.295 649.925L426.795 649.15C385.495 708.3 318.595 747.125 242.52 749.425H242.17C239.095 749.575 235.47 749.65 231.82 749.65C188.57 749.65 148.145 737.6 113.695 716.675L114.695 717.25C51.9948 679.525 8.74479 614.975 0.744794 539.9L0.644795 538.875C0.0197951 523.25 -0.280207 507.625 0.344793 492.325C12.5948 372.85 112.695 280.425 234.37 280.425C248.045 280.425 261.445 281.6 274.47 283.825L273.07 283.625C273.695 329.85 271.82 376.1 271.82 422.325C261.245 418.5 249.045 416.275 236.32 416.275C189.62 416.275 149.895 446.125 135.195 487.8L134.97 488.55C131.645 499.225 129.72 511.5 129.72 524.2C129.72 529.35 130.045 534.45 130.645 539.45L130.595 538.85C138.895 590 182.745 628.6 235.62 628.6C237.145 628.6 238.645 628.575 240.145 628.5H239.92C276.495 627.4 308.245 607.725 326.195 578.65L326.445 578.2C333.12 568.9 337.695 557.65 339.22 545.425L339.245 545.075C342.37 489.15 341.12 433.55 341.42 377.625C341.72 251.725 341.12 126.125 342.045 0.550002L342.145 0.625002Z" />
                                </svg>
                            </a>
                        </div>
                        <p className="text-gray-400 text-sm">Stay updated on new drops & exclusive offers!</p>
                        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
                            <div className="flex-1 w-full">
                                <Input
                                    type="email"
                                    placeholder="Enter email for updates"
                                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 w-full"
                                />
                            </div>
                            <Button className="w-full md:w-auto bg-lime-400 hover:bg-lime-300 text-black">
                                Get Updates
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-2 text-center text-gray-400 text-sm">
                    <p>
                        © {new Date().getFullYear()} <span>Sneakers</span>
                        <span className="text-lime-400">X</span>. All rights reserved.
                    </p>
                </div>
            </div>
        </motion.footer>
    );
}

export default Footer;