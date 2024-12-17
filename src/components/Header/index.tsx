import { useState } from "react";
import { Link } from "@tanstack/react-router";
import logoHorinzontal from "/assets/images/logo_horizontal.png";
import { useAuth } from "../../context/AuthContext";
import newPost from "/assets/icons/edit_document.png";
import login from "/assets/icons/login.png";
import logoutimg from "/assets/icons/logoutimg.png";
import { ModalForm } from "../ModalForm";
import { FormPost } from "../FormPost";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-5">
        <Link
          href="/home"
          className="flex items-center ms-3 space-x-3 rtl:space-x-reverse"
        >
          <img src={logoHorinzontal} alt="Logo" className="w-60 md:w-56" />
        </Link>

        <button
          type="button"
          className="inline-flex items-center p-2 w-14 h-14 me-3 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400"
          onClick={toggleMenu}
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8">
            {isAdmin && (
              <div
                className="flex gap-2 text-sm py-2 px-3 text-green-dark hover:text-gray-500 rounded md:bg-transparent md:p-0 items-center hover:cursor-pointer"
                onClick={handleOpenModal}
              >
                <img src={newPost} alt="Criar Publicação" className="w-4.1 h-5" />
                Criar Publicação
              </div>
            )}

            {!isLoggedIn ? (
              <Link
                href="/Login"
                className="flex gap-2 text-sm py-2 px-3 text-green-dark hover:text-gray-500 rounded md:bg-transparent md:p-0 items-center"
              >
                <img src={login} alt="Login" className="w-4.1 h-5" />
                Login
              </Link>
            ) : (
              <Link
                onClick={logout}
                href="/logout"
                className="flex gap-2 text-sm py-2 px-3 text-green-dark hover:text-gray-500 rounded md:bg-transparent md:p-0 items-center"
              >
                <img src={logoutimg} alt="Logout" className="w-4.1 h-5" />
                Logout
              </Link>
            )}
          </ul>
        </div>
      </div>

      <ModalForm isVisible={showModal} onClose={handleCloseModal}>
        <FormPost handleCloseModal={handleCloseModal} />
      </ModalForm>
    </nav>
  );
}
