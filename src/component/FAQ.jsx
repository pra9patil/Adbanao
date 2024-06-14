import React, { useState } from "react";

const faqs = [
  {
    question: "What is template designing?",
    answer:
      "Template designing involves creating a pre-made layout or structure that can be customized with different content, making it easier for users to create professional designs without starting from scratch.",
  },
  {
    question: "Do I need design experience to use your templates?",
    answer:
      "No, our templates are user-friendly and designed to be easily customizable, even for users with no prior design experience.",
  },
  {
    question: "Can I use these templates for commercial purposes?",
    answer:
      "Yes, our templates can be used for both personal and commercial projects, provided you comply with our licensing terms.",
  },
  {
    question: "Are the templates compatible with all design software?",
    answer:
      "Most templates are compatible with popular design software like Adobe Photoshop, Illustrator, and online tools like Canva, ensuring flexibility in editing. ",
  },
  {
    question: "How do I customize a template to match my brand?",
    answer:
      "You can customize a template by editing the text, colors, images, and other elements to reflect your brand's style using any standard design software or online tool.",
  },
  {
    question: "Can I get support if I encounter issues while designing?",
    answer:
      "Yes, we offer customer support to help you with any issues you may encounter during the design process, ensuring you can create your templates smoothly and efficiently. ",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-10/12 mx-auto space-y-2 py-12">
      {faqs.map((faq, index) => (
        <div>
          <div  onClick={() => toggleFAQ(index)} key={index} className="border-2 px-3 py-4 bg-yellow-200 cursor-pointer">
            <div
              className="flex justify-between items-center  "
             
            >
              <h3 className="font-semibold">{faq.question}</h3>

              <svg
                className={`w-6 h-6 transition-transform transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a.75.75 0 01-.53-.22l-7-7a.75.75 0 111.06-1.06L10 16.94l6.47-6.47a.75.75 0 111.06 1.06l-7 7A.75.75 0 0110 18z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          {openIndex === index && (
            <p className="mt-2 px-3 py-5 bg-white text-gray-600">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
