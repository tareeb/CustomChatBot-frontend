import "./Page.css"
import { useEffect, useState, useContext } from "react";
import DocumentComponent from "@/components/Containers/DocumentComponent";
import Title from "@/components/Title/Title";
import DeleteChatbot from "@/components/Dailog/DeleteChatbot";
import ButtonContainer from "@/components/Containers/ButtonContainer";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UpdateChatbot from "@/components/Dailog/UpdateChatbot";
import { CsrfTokenContext } from "@/context/CsrfTokenContext";
import { toast } from "sonner";
import API_BASE_URL from "@/config";
import Loading from "@/components/loading/Loading";

const Chatbot = () => {
    const { chatbotname } = useParams();
    const { csrfToken, handleUnauthorized } = useContext(CsrfTokenContext);
    
    const [chatbotData, setChatbotData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch chatbot data when the component loads
    useEffect(() => {
        const fetchChatbotData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/${chatbotname}/getchatbotdata/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${csrfToken}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        handleUnauthorized();
                        return;
                    }
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to fetch chatbot data");
                }

                const data = await response.json();
                setChatbotData(data.data); // Store the fetched data in state
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching chatbot data:", error);
                toast.error(error.message || "Failed to fetch chatbot data");
                setIsLoading(false);
            }
        };

        fetchChatbotData();
    }, [chatbotname, csrfToken, handleUnauthorized]);

    // Handle cases where no chatbot data is found
    if (!chatbotData) {
        return <div>Chatbot data not found.</div>;
    }

    return (
        <div className="chatbotPage">
            <Title title={chatbotData ? chatbotData.title : chatbotname} />
            
            {isLoading ? Loading :

            <div className="px-4 md:px-10 lg:px-40 py-8 space-y-7">
                
                <ButtonContainer title="Actions">
                    <div className="md:flex-row flex gap-4 flex-col">
                        <Button asChild>
                            <Link to={`/chat/${chatbotname}`}>Start Chat</Link>
                        </Button>

                        <UpdateChatbot chatbot={chatbotData} setChatbot={setChatbotData} />
                    </div>
                </ButtonContainer>

                <DocumentComponent />

                <ButtonContainer title="Info">
                        <div className="flex md:flex-row flex-col justify-between gap-3">
                            <div className="px-2 py-1 rounded-full text-white border-2 border-black bg-slate-600 ">
                                <p>Chatbot ID: {`${chatbotData.name}`}</p>
                            </div>
                            <div className="px-2 py-1 rounded-full text-white border-2 border-black bg-slate-600 ">
                                <p>Model Type : {chatbotData.model_type}</p>
                            </div>
                            <div className="px-2 py-1 rounded-full text-white border-2 border-black bg-slate-600 ">
                                <p>Public Url : {`${API_BASE_URL}/publicchat/${chatbotData.name}`}</p>
                            </div>
                        </div>
                </ButtonContainer>

                <ButtonContainer title="Delete this Chatbot">
                    <DeleteChatbot chatbotname={chatbotname} />
                </ButtonContainer>
            </div>

            }
        </div>
    );
};

export default Chatbot;
