import FaqsChat from "../components/FAQS/FaqsChat"
import FAQSection from "../components/FAQS/FaqsList"
import Navbar from "@/components/components/Navbar";

const FaqsPage = () => {
    return (
        <div className="homepage">
            
            <Navbar/>
            
            <h2 className="text-2xl py-6 mb-2 md:text-3xl font-bold md:py-10 text-center">Frequently Asked Questions</h2>

            <FaqsChat chatbotname={"custombot"}/>
            <FAQSection/>

        </div>
    )
}

export default FaqsPage