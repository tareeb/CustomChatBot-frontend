import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const faqData = [
    { question: "What can we do ?", answer: "We provide a solution that can be used to build Customized chatbots which can be the first point of contact for your customer queries." },
    { question: "How does it work?", answer: "You need customer service support documents from the user, which may have answers for their customer queries. Then you do all the preprocessing and build a bot that is specifically tailored to answer the user's queries based on the data provided by them." },
    { question: "What features are available?", answer: "Chatbots specifically tailored with the data you provide to help your customers. Update data anytime to keep your chatbots' responses up to date. Full protection of your data and chatbot with advanced Authentication and Authorization. LLM Guards to protect your chatbot from being misused by protecting it from prompt injections." },
    { question: "Can I customize my chatbot responses?", answer: "Yes, based on your request, you can instruct your specific bot to obey some rules and instructions." },
    { question: "What is prompt injection?", answer: "Prompt injection is a new technique where an attacker tries to gain control of the system by overtaking the system prompt. They try to give their own rules and instructions and try to make the bot obey those instead of the ones tailored by you or us. However, we do provide protection from prompt injection by using LLM Guards." },
    { question: "What is LLM Guard?", answer: "Our system is protected by LLM Guard. It helps to detect if there is a prompt injection attack and keep the system safe by detecting suspicious requests." },
    { question: "What language models do you use?", answer: "We have two versions: One relying completely on open source models (LLAMA-3-70B). One using proprietary models (GPT-4)." },
    { question: "What versions/types of bots do you have?", answer: "We have two main types of bots: SwiftChat: Built completely using open-source tools and is FAST, but it requires that the data you provide is simple and organized. AdvancedChatbot: A complex bot that requires services from proprietary models such as GPT-4. It has greater capability and can even work when your documents are a bit rough and lengthy and are not specifically tailored for chatbots." },
    { question: "What use cases are available? How can I use those chatbots?", answer: "For advanced users, we provide: Custom URLs for your chatbots which can be called from anywhere and can be integrated into your existing systems. REACT components for chat widgets which can be integrated into your own websites. You can use our system as an admin portal to manage the data in your chatbots and utilize the UI components to provide chatbot accessibility to your users/customers." },
    { question: "HelpDesk and information Contact Address", answer: "CustomerServiceSupportAgents@gmail.com (if the information is unclear and not given)" }
  ];

const FAQSection = () => {
  return (
    <div className="max-w-3xl mx-auto py-4 px-4">
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;