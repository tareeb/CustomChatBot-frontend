import { useState, useEffect } from 'react';
import { Send, Loader2 , CircleX} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import API_BASE_URL from "@/config"
import PropTypes from 'prop-types';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"

const FaqsChat = ({chatbotname}) => {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  useEffect(() => {
    setShowButton(input.length > 1);
  }, [input]);

  const clearanswer = () => {
    setAnswer("");
    setAccordionOpen("");
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    if (!input.trim()) return;

    setLoading(true);
    setAccordionOpen(false);

    try {
      const response = await fetch(`${API_BASE_URL}/${chatbotname}/publicchat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error in sending message");
      }

      const data = await response.json();
      setAnswer(data.response);
      setAccordionOpen(true);

    } catch (error) {
      console.error('Error:', error);
      toast.error(error || "Error in Sending Message");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto overflow-x-hidden py-1 px-4">
      

      <Accordion
        type="single"
        collapsible
        className="transition-all duration-500 ease-in-out"
        value={accordionOpen ? "answer" : ""}
      >
        <form onSubmit={handleSubmit} className="mb-2">
        <div className="flex items-center space-x-2 relative">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={answer}
            placeholder="Ask your question here"
            className="flex-grow pr-10"
          />
          <div
            className={`absolute right-2 transition-all duration-300 ease-in-out ${
              showButton ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <Button type="submit" size="sm" disabled={loading || !input.trim()}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>

            <div
                className={`absolute right-2 transition-all duration-300 ease-in-out ${
                answer ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
            >
                <Button size="sm" onClick={clearanswer} >
                    <CircleX className="w-4 h-4" />
                </Button>
            </div>

        </div>
        </form>

        <AccordionItem value="answer">
          <AccordionContent>
            <p className="text-sm font-semibold text-gray-800">{answer}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

FaqsChat.propTypes = {
  chatbotname: PropTypes.string.isRequired,
};

export default FaqsChat;