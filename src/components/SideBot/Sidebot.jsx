import SideBotChat from "@/components/SideBot/SideBotChat"; 

import { useState } from 'react';

import logo from "@/assets/logo_top_1.png";

import PropTypes from 'prop-types';

const Sidebot = ({chatbotname , title}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>

      {!isOpen && 
      
      <img src={logo}
            className="fixed bottom-5 bg-white bg-opacity-60 hover:bg-opacity-100  hover:cursor-pointer
                        right-5 w-20 h-20 shadow-lg rounded-full p-2 focus:outline-none z-10
                        transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={toggleSidebot}
      >
      </img>}

      {/* Chatbot window */}  
      <div className={`fixed z-20 bottom-10 right-10  bg-white shadow-lg rounded-xl border border-black overflow-hidden transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-[400px]'}`}>   
          <div className="flex justify-between items-center bg-slate-800 text-white p-2 rounded-t-lg">
            <h2 className="text-lg">{title}</h2>
            <button
              className="text-lg font-bold focus:outline-none"
              onClick={toggleSidebot}
            >
              &times; 
            </button>
          </div>
          <div className="h-96 w-64">
            <SideBotChat chatbotname={chatbotname} />
          </div>
        </div>
      
      
    </div>
  );
};

Sidebot.propTypes = {
  chatbotname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Sidebot;
