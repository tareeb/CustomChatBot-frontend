import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

import { Toaster } from "@/components/ui/sonner"

import Chat from "@/pages/Chat"
import Chatbot from "@/pages/Chatbot"
import NotFound from '@/pages/NotFound';
import Login  from '@/pages/Login';
import Signup from '@/pages/Signup';
import Admin from '@/pages/Admin';
import Home from '@/pages/Home';
import BrowseAll from '@/pages/BrowseAll';
import FaqsPage from '@/pages/Faqs';

import { CsrfTokenProvider } from "@/context/CsrfTokenContext";

function App() {

  return (
    <>
    <Router>
      <CsrfTokenProvider>
          <Routes>
              <Route exact path="/"                 element={<Home></Home>}       />

              <Route path="/login"                  element={<Login></Login>}     />
              <Route path="/signup"                 element={<Signup></Signup>}   />
              
              <Route path="/admin"                  element={<Admin></Admin>}     />
              <Route path="/chatbot/:chatbotname"   element={<Chatbot></Chatbot>} />
              
              <Route path="/browseall"              element={<BrowseAll></BrowseAll>}  />
              <Route path="/chat/:chatbotname"      element={<Chat></Chat>}   />       

              <Route path="/faqs"                   element={<FaqsPage></FaqsPage>}    />   
              <Route path="*"                       element={<NotFound></NotFound>} />     
              
          </Routes>
        <Toaster />
      </CsrfTokenProvider>
    </Router>
    </>
  );
}

export default App
