import API_BASE_URL from "@/config";
import { useContext } from 'react';
import { CsrfTokenContext } from "@/context/CsrfTokenContext";
import { toast } from "sonner";

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import propTypes from 'prop-types';

const ChatbotGrid = ({chatbots , setchatbots}) => {

    const { csrfToken , handleUnauthorized } = useContext(CsrfTokenContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (csrfToken) {
            getChatbots();
        }
    }, [csrfToken]);

    async function getChatbots() {
        try {
            const response = await fetch(`${API_BASE_URL}/chatbotbyuser/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${csrfToken}`,
                },
            });

            console.log("helloe" , response);

            if (!response.ok) {
                if (response.status === 401) {
                    handleUnauthorized();
                    return;
                  }
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to Fetch Data");
            }

            const data = await response.json();
            console.log(data);
            setchatbots(data.data);

            return data.response;
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error(error || "Failed to Fetch Data");
        }
    }


    const handleonClick = (chatbot) => {
        console.log(chatbot);
        navigate(`/chatbot/${chatbot.name}`);
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {
                    chatbots.map((chatbot, index) => (
                        <div key={index} className="p-10 flex text-center items-center justify-center h-32 shadow-lg
                                border-2 border-solid border-black rounded-lg bg-white bg-opacity-75
                                cursor-pointer hover:bg-opacity-100 hover:shadow-xl transition duration-300 ease-in-out"
                                onClick={() => handleonClick(chatbot)}
                                >
                            <h1 className="text-2xl font-bold select-none">{chatbot.name}</h1>
                        </div>
                    ))
                }
            </div>

        </>
    );
};

ChatbotGrid.propTypes = {
    chatbots: propTypes.array.isRequired,
    setchatbots: propTypes.func.isRequired,
};

export default ChatbotGrid;

