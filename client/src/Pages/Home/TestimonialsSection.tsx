import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Mohammed Amine",
    city: "Casablanca",
    text: "The best selection of limited edition sneakers I've ever found. Fast shipping and authentic products!",
  },
  {
    id: 2,
    name: "Fatima Zahra",
    city: "Marrakech",
    text: "I snagged a pair of rare Jordans I’d been hunting for years. The customer service was top-notch and delivery was lightning fast!",
  },
  {
    id: 3,
    name: "Youssef El Idrissi",
    city: "Rabat",
    text: "Affordable prices for premium kicks, and everything arrives in pristine condition. This is my go-to store now!",
  }
]

const testimonialVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

function TestimonialsSection() {
  return (
    <section className="px-[2.5vw] py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 ibrand"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          What Our Customers Say
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={testimonialVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <p className="text-lg mb-4 flex-1">"{testimonial.text}"</p>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.city}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection;