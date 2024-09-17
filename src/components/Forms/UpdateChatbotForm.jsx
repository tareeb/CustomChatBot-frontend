import PropTypes from 'prop-types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle, Info } from "lucide-react";

const UpdateChatbotForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <div className='flex gap-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 mr-1" />
              </TooltipTrigger>
              <TooltipContent className="bg-teal-100">
                <p>Chatbot name for users (e.g., organization name)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Label htmlFor="title" className="text-right">Title:</Label>
        </div>
        <Input
          id="title"
          name="title"
          className="col-span-3"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="prompt" className="text-right">Prompt:</Label>
        <div className="col-span-3 space-y-2">
          <Textarea
            id="prompt"
            name="prompt"
            className="min-h-[50px] overflow-hidden"
            value={formData.prompt}
            onChange={handleChange}
            placeholder={"You are an assistant for question-answering tasks. Use the retrieved context to answer questions. Generate answers only using the given context. If information is lacking, politely inform the user and suggest contacting support at support@gmail.com. Keep answers concise and supportive."}
          />
          <Popover>
            <PopoverTrigger asChild>
              <button className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                <HelpCircle className="w-4 h-4 mr-1" />
                Prompt Instructions
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-teal-100">
              <p className="text-sm">
                Prompts are instructions for your chatbot. Default is in placeholder. Leave blank to use the default.
                <br /><br />
                Customize the prompt for your organization. Example of Customized Prompt: 
                <br /><br />
                You are an assistant for National University of Science and Technology. You must only answer Questions Related to NUST. Use the retrieved context to answer questions. Generate answers only using the given context. If information is lacking, politely inform the user and suggest contacting support at nust@gmail.com. Be Helpful.
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <div className='flex gap-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild><Info className="w-4 h-4 mr-1" /></TooltipTrigger>
              <TooltipContent className="bg-teal-100">
                <p>Set whether the model is public for everyone to use</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Label htmlFor="isPublic" className="text-right">Public:</Label>
        </div>
        <Switch
          id="isPublic"
          name="isPublic"
          checked={formData.isPublic}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
        />
      </div>
    </div>
  );
};

UpdateChatbotForm.propTypes = {
  formData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default UpdateChatbotForm;