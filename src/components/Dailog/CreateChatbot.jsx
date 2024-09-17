import { useState, useContext } from 'react';
import { CsrfTokenContext } from "@/context/CsrfTokenContext";
import { toast } from "sonner";
import API_BASE_URL from "@/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateChatbotForm from '@/components/Forms/CreateChatbotForm';
import propTypes from 'prop-types';


const CreateChatbot = ({ setchatbots }) => {
  const { csrfToken, handleUnauthorized } = useContext(CsrfTokenContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    chatbotname: "",
    title: "",
    prompt: "",
    isPublic: false,
    modeltype: "simple"
  });

  const createChatbot = async () => {
    if (!formData.chatbotname) {
      toast("Please write a name for chatbot.");
      return;
    }

    const nameRegex = /^[A-Za-z]+$/; 

    if (!nameRegex.test(formData.chatbotname)) {
      toast("Chatbot name can contain only letters");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/createchatbot/`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${csrfToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleUnauthorized();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create new chatbot");
      }
    
      const data = await response.json();
      setIsOpen(false);
      setchatbots((prevData) => ([...prevData, data.data]));
      toast("Chatbot Created Successfully");

    } catch (error) {
      console.error('Error creating chatbot:', error);
      toast.error(error.message || "Failed to create new chatbot");
    } finally {
      setFormData({
        chatbotname: "",
        title: "",
        prompt: "",
        isPublic: false,
        modeltype: "simple"
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create</Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Chatbot</DialogTitle>
          <DialogDescription>
            Please fill in the details for your new chatbot.
          </DialogDescription>
        </DialogHeader>

        <CreateChatbotForm formData={formData} setFormData={setFormData} />
      
        <DialogFooter>
          <Button onClick={createChatbot} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>

          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

CreateChatbot.propTypes = {
  setchatbots: propTypes.func.isRequired,
}

export default CreateChatbot;