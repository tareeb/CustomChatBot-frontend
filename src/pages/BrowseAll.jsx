import "./Page.css";

import Title from "@/components/Title/Title";
import ButtonContainer from "@/components/Containers/ButtonContainer";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import AllChatbotsGrid from "@/components/Grids/AllChatbotsGrid";
import { useContext } from 'react';
import { CsrfTokenContext } from "@/context/CsrfTokenContext";

const BrowseAll = () => {
    const { csrfToken } = useContext(CsrfTokenContext);

    return (
        <>
            <div className="browseallPage">
                <div>
                    <Title title="Browse All Public Chatbots" />
                </div>
                
                <div>
                    
                    <div className="px-4 md:px-10 lg:px-40 py py-6">
                        <ButtonContainer title="Start Creating Your Own Now">
                            {csrfToken ? 
                            <Button asChild>
                                <Link to="/admin" >Admin Page</Link>
                            </Button> : 
                            <Button asChild>
                                <Link to="/login" >Login Now</Link>
                            </Button>}
                        </ButtonContainer>
                    </div>

                    <div className="px-4 md:px-10 lg:px-40 py-6">
                        <AllChatbotsGrid/>
                    </div>
                    
                </div>
            </div>
            
        </>
    );
};

export default BrowseAll;