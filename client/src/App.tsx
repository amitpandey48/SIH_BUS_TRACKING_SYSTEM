import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, createContext, useContext } from "react";
import NotFound from "./pages/not-found";
import Landing from "./pages/Landing";
import AuthorityLogin from "./pages/AuthorityLogin";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import UserAuth from "./pages/UserAuth";
import UserDashboard from "./pages/UserDashboard";
import Navbar from "./components/Navbar";
import ConfirmationModal from "./components/ConfirmationModal";

interface AppContextType {
  showModal: (message: string) => void;
  hideModal: () => void;
  modalVisible: boolean;
  modalMessage: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    // During development, provide a safe fallback instead of throwing
    console.warn("useAppContext called outside of AppProvider, using fallback");
    return {
      showModal: (message: string) => console.log("Modal:", message),
      hideModal: () => console.log("Modal hidden"),
      modalVisible: false,
      modalMessage: ""
    };
  }
  return context;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/authority-login" component={AuthorityLogin} />
      <Route path="/authority-dashboard" component={AuthorityDashboard} />
      <Route path="/user-auth" component={UserAuth} />
      <Route path="/user-dashboard" component={UserDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalMessage("");
  };

  const contextValue = {
    showModal,
    hideModal,
    modalVisible,
    modalMessage,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContext.Provider value={contextValue}>
          <div className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />
            <Router />
            <ConfirmationModal />
          </div>
          <Toaster />
        </AppContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
