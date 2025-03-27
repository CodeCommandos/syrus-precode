/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ReviewCard from "../components/ui/card";
import { Accordion, AccordionItem } from "../components/ui/Accordion";
import Chatbot from "../components/Chatbot/Chatbot"; 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = localStorage.getItem("currentUser");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      console.log(user);
      navigate('/login');
    }
  }, []);

  const reviews = [
    {
      name: "Amit Sharma",
      role: "Retail Investor",
      feedback:
        "NiveshMitra has completely transformed how I approach investments. The real-time analytics are a game-changer!",
      rating: 5,
    },
    {
      name: "Priya Verma",
      role: "Financial Analyst",
      feedback:
        "The collaborative trading tools and blockchain security make this platform stand out. Highly recommended!",
      rating: 5,
    },
    {
      name: "Rohit Gupta",
      role: "Market Expert",
      feedback:
        "MarketRewind and Satellite Insights have given me unparalleled market perspectives.",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Video Background - Fixed to viewport */}
      {/* <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="w-full h-full">
          <iframe
            src="https://www.youtube.com/embed/ipUuoMCEbDQ?autoplay=1&mute=1&loop=1&playlist=ipUuoMCEbDQ&controls=0&disablekb=1&modestbranding=1"
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Background Video"
          ></iframe>
        </div>
      </div> */}

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-orange-800 bg-clip-text text-transparent">
              Empower Your Investments with NiveshMitra
            </h1>

            <div className="text-2xl md:text-3xl text-muted-foreground">
              <Typewriter
                words={[
                  "Unified Market Data",
                  "Real-Time Analytics",
                  "Collaborative Trading",
                  "Blockchain Security",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex gap-4 justify-center mt-8"
            >
              <button className="bg-primary text-white dark:text-slate-900 px-8 py-3 rounded-full text-lg hover:bg-primary/90 transition-all">
                Get Started
              </button>
              <button className="border px-8 py-3 rounded-full text-lg hover:border-primary transition-all">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Rest of the content with solid background */}
        <div className="bg-background">
          <main className="container mx-auto px-4">
            {/* Features Grid */}
            <section className="py-24">
              <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Real-Time Analytics",
                    desc: "Gain actionable insights with live market data and interactive dashboards.",
                    icon: "📊",
                  },
                  {
                    title: "Blockchain Security",
                    desc: "Ensure secure and immutable transactions with blockchain technology.",
                    icon: "🔒",
                  },
                  {
                    title: "Collaborative Trading",
                    desc: "Work with your team in real-time to develop synergistic strategies.",
                    icon: "🤝",
                  },
                  {
                    title: "MarketRewind",
                    desc: "Replay historical market events to refine your strategies.",
                    icon: "⏪",
                  },
                  {
                    title: "Expert Video Call",
                    desc: "Connect with market experts via one-on-one video calls for personalized advice.",
                    icon: "📹",
                  },
                  {
                    title: "Simulated Trading",
                    desc: "Practice trading risk-free with our simulated environment.",
                    icon: "🎮",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-8 rounded-xl border hover:border-primary/50 transition-all group bg-background"
                  >
                    <div className="text-4xl mb-4 group-hover:text-primary transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section className="py-24">
              <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} index={index} />
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <Accordion>
                <AccordionItem
                  title="What is NiveshMitra?"
                  content="NiveshMitra is a unified platform that consolidates market data, provides real-time analytics, and fosters collaborative trading for smarter investment decisions."
                />
                <AccordionItem
                  title="How does NiveshMitra ensure security?"
                  content="We use blockchain technology to ensure secure and immutable transactions, along with advanced encryption protocols."
                />
                <AccordionItem
                  title="Can I practice trading without risks?"
                  content="Yes! Our simulated trading environment allows you to test and refine your strategies risk-free."
                />
                <AccordionItem
                  title="Is expert guidance available on NiveshMitra?"
                  content="Yes! NiveshMitra offers an Expert Video Call feature that allows you to connect with market experts for personalized advice and guidance tailored to your investment needs."
                />
              </Accordion>
            </section>
          </main>

          <Footer />
        </div>
      </div>

      <Chatbot />
    </div>
  );
};

export default Home;