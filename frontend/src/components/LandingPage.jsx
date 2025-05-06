import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  UserCircle,
  Search,
  CheckSquare,
  Target,
  CheckCircle,
  BarChart2,
} from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920",
    title: "Achieve Your Dreams",
    description: "Find scholarships that match your academic goals",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920",
    title: "Access Thousands of Opportunities",
    description:
      "Browse through government, private, and institutional scholarships all in one place",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80",
    title: "Your Education, Your Future",
    description: "Get financial support for your education",
  },
];

const Slideshow = ({ scrollToAbout }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[calc(100vh-4rem)] overflow-hidden mt-16">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 scale-100 rotate-0" 
              : "opacity-0 scale-110 rotate-3"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center max-w-4xl px-4">
              <h1 
                className={`text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight transition-all duration-1000 transform ${
                  index === currentSlide 
                    ? "translate-y-0 opacity-100 blur-0" 
                    : "translate-y-8 opacity-0 blur-sm"
                }`}
              >
                {slide.title}
              </h1>
              <p 
                className={`text-xl md:text-2xl text-gray-200 mb-8 transition-all duration-1000 delay-200 transform ${
                  index === currentSlide 
                    ? "translate-y-0 opacity-100 blur-0" 
                    : "translate-y-8 opacity-0 blur-sm"
                }`}
              >
                {slide.description}
              </p>
              <div 
                className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 transform ${
                  index === currentSlide 
                    ? "translate-y-0 opacity-100 scale-100" 
                    : "translate-y-8 opacity-0 scale-95"
                }`}
              >
                <Link to="/user/scheme">
                  <button 
                    className="group bg-[#001a33] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden"
                  >
                    <span className="relative z-10">Find Scholarships</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </Link>
                <button
                  onClick={scrollToAbout}
                  className="group bg-[#001a33] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden"
                >
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-all duration-300 transform hover:scale-110 active:scale-90 hover:rotate-12"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-all duration-300 transform hover:scale-110 active:scale-90 hover:-rotate-12"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 transform hover:scale-125 ${
              index === currentSlide 
                ? "bg-white scale-110 ring-4 ring-white/30" 
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const steps = [
  {
    icon: UserCircle,
    title: "Enter Details",
    description: "Start by entering your basic details!",
  },
  {
    icon: Search,
    title: "Search",
    description: "Our search engine will find the relevant schemes!",
  },
  {
    icon: CheckSquare,
    title: "Select & Apply",
    description: "Select and apply for the best suited scheme",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg font-semibold text-gray-500 tracking-wide mb-5 animate-fade-in">
          How It Works
        </p>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 animate-fade-in-delay">
          Easy steps to apply for Schemes
        </h2>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center p-6 bg-emerald-50 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105 hover:rotate-1 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-16 h-16 flex items-center justify-center bg-[#001a33] rounded-full mb-4 transition-all duration-500 transform group-hover:scale-125 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-purple-600">
                <step.icon className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-500" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 transition-all duration-300 transform group-hover:scale-110 group-hover:text-[#001a33]">
                {step.title}
              </h3>

              <p className="text-gray-600 text-center transition-all duration-300 group-hover:text-gray-800">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform translate-x-full">
                  <div className="absolute right-0 -mt-1 w-2 h-2 rounded-full bg-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function AboutUs() {
  return (
    <section
      id="about"
      className="py-16 px-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 gradient-text animate-fade-in">
            About FindMyScholarship
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-400 mx-auto mt-3 transform hover:scale-x-150 transition-transform duration-500"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 gradient-text">
                What We Offer
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-xl bg-gray-100 p-3 rounded-full group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500">
                    <Target className="w-6 h-6 text-[#001a33] group-hover:text-white transition-colors duration-300" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#001a33] transition-colors duration-300">
                      Smart Matching
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      Advanced algorithms to match you with relevant
                      scholarships based on your profile.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-xl bg-gray-100 p-3 rounded-full group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-500">
                    <CheckCircle className="w-6 h-6 text-[#001a33] group-hover:text-white transition-colors duration-300" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#001a33] transition-colors duration-300">
                      All-in-One Access
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      Access to government, private, and institutional
                      scholarships all in one place. Stay updated with real-time
                      notifications about new opportunities, deadlines, and
                      more.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-xl bg-gray-100 p-3 rounded-full group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-red-500 transition-all duration-500">
                    <BarChart2 className="w-6 h-6 text-[#001a33] group-hover:text-white transition-colors duration-300" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#001a33] transition-colors duration-300">
                      Eligibility Checker
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      Real-time verification of your eligibility for various
                      scholarship programs.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative w-full pt-[56.25%] rounded-xl shadow-lg overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                src="https://www.youtube.com/embed/bNOWkB-6cmc?start=10"
                title="About Scholarships"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center text-gray-600 italic animate-float">
              Learn how FindMyScholarship can help you achieve your educational
              goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "What is FindMyScholarship?",
    answer:
      "FindMyScholarship is an e-Marketplace for Govt. schemes and services. Using FindMyScholarship you can find various government schemes, check your eligibility, and apply for the schemes.",
  },
  {
    question: "How FindMyScholarship will help common Students?",
    answer:
      "FindMyScholarship will reduce the time and effort of Students in searching for appropriate government schemes. The easy user interface of FindMyScholarship helps students a lot in discovering and applying for schemes.",
  },
  {
    question: "Can I apply for the schemes through FindMyScholarship?",
    answer:
      "For now, the platform shall direct you to the application page of the scheme of your choice. It is envisaged that in the upcoming phases, FindMyScholarship shall have the feature to apply for schemes / services from within the platform/ app.",
  },
  {
    question:
      "How does FindMyScholarship work? How do I check for my eligibility through FindMyScholarship?",
    answer:
      "FindMyScholarship offers a convenient three-step process for the students to discover the government schemes for which they are eligible: Step 1 - The user enters his / her attributes such as grades, income, social details, etc. Step 2 - The FindMyScholarship finds the relevant schemes from hundreds of schemes for the user. Step 3 - The user can select from the list of eligible schemes and get more information from the dedicated scheme page with detailed knowledge, FAQs, and application process and traverse to the application URL to apply.",
  },
  {
    question:
      "What all information about a particular scheme can I find on FindMyScholarship?",
    answer:
      "FindMyScholarship provides details on the eligibility criteria, application process, and benefits being offered under that scheme. FindMyScholarship also answers the Frequently Asked Questions(FAQs) about the scheme.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <p className="text-gray-600 text-lg animate-fade-in">Frequently Asked Questions</p>
          <h2 className="text-3xl font-bold mt-2 mb-12 gradient-text animate-fade-in-delay">
            Checkout our knowledge base for some of your answers!
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2 group">
            <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
                alt="FAQ Illustration"
                className="w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="lg:w-1/2 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-white rounded-lg shadow-md overflow-hidden transform hover:translate-x-2 transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-colors duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-gray-900 group-hover:text-[#001a33] transition-colors duration-300">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-all duration-300 transform ${
                      openIndex === index ? "rotate-180 scale-110" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index 
                      ? "max-h-96 py-4 bg-gradient-to-r from-gray-50 to-white" 
                      : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Update the styles section
const styles = `
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(20px) scale(0.95);
      filter: blur(10px);
    }
    to { 
      opacity: 1; 
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-fade-in {
    animation: fadeIn 0.8s ease-out forwards;
  }

  .animate-fade-in-delay {
    animation: fadeIn 0.8s ease-out 0.2s forwards;
    opacity: 0;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .gradient-text {
    background: linear-gradient(45deg, #001a33, #004d80, #0066cc);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradient 5s ease infinite;
  }

  .faq-item {
    transition: all 0.3s ease;
  }

  .faq-item:hover {
    transform: translateX(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .faq-item button:hover {
    background: linear-gradient(90deg, rgba(0, 26, 51, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
  }
`;

const LandingPage = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <style>{styles}</style>
      <Slideshow scrollToAbout={scrollToAbout} />
      <HowItWorks />
      <AboutUs />
      <FAQ />
    </div>
  );
};

export default LandingPage;
