import { useState, createContext, ReactNode } from "react";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalForm } from "./components/ModalForm";
import { AuthProvider } from './context/AuthContext';
import { CurrentPageProvider } from './context/CurrentPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient();

interface ModalContextType {
  handleOpenModal: (content: ReactNode) => void;
}

export const ModalContext = createContext<ModalContextType>({
  handleOpenModal: () => {},
});

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <CurrentPageProvider>
          <ModalContext.Provider value={{ handleOpenModal }}>
            <RouterProvider router={router} />
            <ModalForm isVisible={showModal} onClose={handleCloseModal}>
              {modalContent}
            </ModalForm>
          </ModalContext.Provider>
        </CurrentPageProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
