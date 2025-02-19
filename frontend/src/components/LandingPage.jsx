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

const Slideshow = () => {
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
    <div className="relative h-[calc(100vh-4rem)] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center max-w-4xl px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#001a33] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors">
                  Find Scholarships
                </button>
                <button className="bg-white bg-[#001a33] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
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
    <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* "How It Works" Title in Gray */}
        <p className="text-lg font-semibold text-gray-500 tracking-wide mb-5">
          How It Works
        </p>

        {/* Main Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Easy steps to apply for Schemes
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-emerald-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-[#001a33] rounded-full mb-4">
                <step.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center">{step.description}</p>

              {/* Connector line between cards (visible only on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 w-8 h-0.5 bg-gray-300 transform translate-x-full">
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
    <section className="py-16 px-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">
            About FindMyScholarship
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-900 to-blue-400 mx-auto mt-3"></div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div className="flex flex-col gap-8">
            {/* Features Box */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                What We Offer
              </h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="text-xl bg-gray-100 p-3 rounded-full">
                    <Target className="w-6 h-6 text-[#001a33]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Smart Matching
                    </h3>
                    <p className="text-gray-600">
                      Advanced algorithms to match you with relevant
                      scholarships based on your profile.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-xl bg-gray-100 p-3 rounded-full">
                    <CheckCircle className="w-6 h-6 text-[#001a33]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      All-in-One Access
                    </h3>
                    <p className="text-gray-600">
                      Access to government, private, and institutional
                      scholarships all in one place. Stay updated with real-time
                      notifications about new opportunities, deadlines, and
                      more.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className="text-xl bg-gray-100 p-3 rounded-full">
                    <BarChart2 className="w-6 h-6 text-[#001a33]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Eligibility Checker
                    </h3>
                    <p className="text-gray-600">
                      Real-time verification of your eligibility for various
                      scholarship programs.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Video Section */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full pt-[56.25%] rounded-xl shadow-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/bNOWkB-6cmc?start=10"
                title="About Scholarships"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center text-gray-600 italic">
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
      "FindMyScholarship is an e-Marketplace for Govt. schemes and services. Using myScheme you can find various government schemes, check your eligibility, and apply for the schemes.",
  },
  {
    question: "How myScheme will help common citizens?",
    answer:
      "myScheme will reduce the time and effort of citizens in searching for appropriate government schemes. The easy user interface of myScheme helps common people a lot in discovering and applying for schemes.",
  },
  {
    question: "Can I apply for the schemes through myScheme?",
    answer:
      "For now, the platform shall direct you to the application page of the scheme of your choice. It is envisaged that in the upcoming phases, myScheme shall have the feature to apply for schemes / services from within the platform/ app.",
  },
  {
    question:
      "How does myScheme work? How do I check for my eligibility through myScheme?",
    answer:
      "myScheme offers a convenient three-step process for the citizens to discover the government schemes for which they are eligible: Step 1 - The user enters his / her attributes such as demographic, income, social details, etc. Step 2 - The myScheme finds the relevant schemes from hundreds of schemes for the user. Step 3 - The user can select from the list of eligible schemes and get more information from the dedicated scheme page with detailed knowledge, FAQs, and application process and traverse to the application URL to apply.",
  },
  {
    question:
      "What all information about a particular scheme can I find on myScheme?",
    answer:
      "myScheme provides details on the eligibility criteria, application process, and benefits being offered under that scheme. myScheme also answers the Frequently Asked Questions(FAQs) about the scheme.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <p className="text-gray-600 text-lg">Frequently Asked Questions</p>
          <h2 className="text-3xl font-bold mt-2 mb-12">
            Checkout our knowledge base for some of your answers!
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
              alt="FAQ Illustration"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>

          <div className="lg:w-1/2 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                    openIndex === index ? "max-h-96 py-4" : "max-h-0"
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

const LandingPage = () => {
  return (
    <div>
      <Slideshow />
      <HowItWorks />
      <AboutUs />
      <FAQ />
    </div>
  );
};

export default LandingPage;
