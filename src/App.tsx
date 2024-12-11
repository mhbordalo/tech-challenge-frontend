import { useState, createContext, ReactNode } from "react";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalForm } from "./components/ModalForm";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

// context type
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
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={{ handleOpenModal }}>
        <RouterProvider router={router} />
        <ModalForm isVisible={showModal} onClose={handleCloseModal}>
          {modalContent}
        </ModalForm>
      </ModalContext.Provider>
    </QueryClientProvider>
  );
}
