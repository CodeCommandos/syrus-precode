import './App.css'
import { Button } from "@/components/ui/button";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { ThemeProvider } from "./context/Theme"; 
import { Toaster } from "sonner";
import Home from "../src/pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatPage from './pages/ChatPage';
import CreateGroup from './pages/CreateGroup';
import Experts from './pages/Experts';
import Notifications from './pages/Notifications';
import AcceptForm from "./pages/AcceptForm";
import ConfirmRequest from "./pages/ConfirmRequest";
import VideoPage from "./pages/VideoPage";
import Welcome from './pages/Welcome';
import AdminDashboard from './pages/AdminDashboard';
import News from './pages/News';
import MarketVisualization from './pages/MarketVisalization';
import ViewStock from './pages/ViewStock';
import ViewCrypto from './pages/ViewCrypto';
function App() {


  return (
    <ThemeProvider>
     <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/meet/request" element={<Notifications />} />
          <Route path="/meet/accept/:meetingId" element={<AcceptForm />} />
          <Route path="/confirm-request" element={<ConfirmRequest />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/news" element={<News />} />
          <Route path="/market-visualtization" element={<MarketVisualization />} />
          <Route path ="/view-stock/:symbol" element={<ViewStock />} />
          <Route path ="/view-crypto/:symbol" element={<ViewCrypto />} />
        </Routes>
        <Toaster position="bottom-right" richColors />
     </Router>
    </ThemeProvider>
  )
}

export default App
