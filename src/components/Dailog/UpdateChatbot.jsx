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
import UpdateChatbotForm from '@/components/Forms/UpdateChatbotForm';
import PropTypes from 'prop-types';


const UpdateChatbot = ({ chatbot, setChatbot }) => {
  const { csrfToken, handleUnauthorized } = useContext(CsrfTokenContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    chatbotname: chatbot.name,
    title: chatbot.title || "",
    prompt: chatbot.prompt || "",
    isPublic: chatbot.isPublic || false,
    modeltype: chatbot.modeltype || "simple"
  });

  const updateChatbot = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/updatechatbot/`, {
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
        throw new Error(errorData.message || "Failed to update chatbot");
      }
    
      const data = await response.json();
      setIsOpen(false);
      console.log(data.data)
      setChatbot(data.data);
      toast("Chatbot Updated Successfully");

    } catch (error) {
      console.error('Error updating chatbot:', error);
      toast.error(error.message || "Failed to update chatbot");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Update</Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Chatbot</DialogTitle>
          <DialogDescription>
            Update the details for your chatbot.
          </DialogDescription>
        </DialogHeader>

        <UpdateChatbotForm formData={formData} setFormData={setFormData} />
      
        <DialogFooter>
          <Button onClick={updateChatbot} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
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

UpdateChatbot.propTypes = {
    chatbot: PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      prompt: PropTypes.string,
      isPublic: PropTypes.bool,
      modeltype: PropTypes.oneOf(['simple', 'advanced']),
    }).isRequired,
    setChatbot: PropTypes.func.isRequired,
};

export default UpdateChatbot;