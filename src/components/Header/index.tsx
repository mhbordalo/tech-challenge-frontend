import { useContext, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ModalContext } from "../../App";
import { FormPost } from "../FormPost";
import { Post } from "../../types";

import logoHorinzontal from "/assets/images/logo_horizontal.png";
import newPost from "/assets/icons/edit_document.png";
import adminPanel from "/assets/icons/admin_panel_settings.png";
import login from "/assets/icons/login.png";
import logout from "/assets/icons/logout.png";

export function Header() {
  const { handleOpenModal } = useContext(ModalContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = true;
    const userIsAdmin = true;

    setIsLoggedIn(userIsLoggedIn);
    setAdmin(userIsLoggedIn && userIsAdmin);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCreatePost = () => {
    const emptyPost: Post = {
      author: "", // context user
      title: "",
      content: "",
      img: "",
    };

    handleOpenModal(
      <FormPost
        postToEdit={emptyPost}
        handleEditedPostList={(newPost) => {
          console.log("Nova publicação criada:", newPost);
          // add post api
        }}
      />
    );
  };

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-5">
        <Link href="/home" className="flex items-center ms-3 space-x-3 rtl:space-x-reverse">
          <img src={logoHorinzontal} alt="Logo" className="w-60 md:w-56" />
        </Link>

        <button
          type="button"
          className="inline-flex items-center p-2 w-14 h-14 me-3 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8">
            {admin && (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleCreatePost();
                }}
                className="flex gap-2 text-sm py-2 px-3 text-green-dark hover:text-gray-500 rounded md:bg-transparent md:p-0 items-center"
              >
                <img src={newPost} alt="Criar Publicação" className="w-4.1 h-5" />
                Criar Publicação
              </a>
            )}

            {admin && (
              <Link
                href="/home"
                className="flex gap-2 text-sm py-2 px-3 text-green-dark hover:text-gray-500 rounded md:bg-transparent md:p-0 items-center"
              >
                <img src={adminPanel} alt="Área Administrativa" className="w-4.1 h-5" />
                Área Administrativa
              </Link>
            )}

            {!isLoggedIn ? (
              <Link
                href="/login"
                className="flex gap-2 text-sm py-2 px-3 text-green-dark hover:text-gray-500 rounded md:bg-transparent md:p-0 items-center"
              >
                <img src={login} alt="Login" className="w-4.1 h-5" />
                Login
              </Link>
            ) : (
              <Link
                href="/logout"
                className="flex gap-2 text-sm py-2 px-3 text-green-dark hover:text-gray-500 rounded md:bg-transparent md:p-0 items-center"
              >
                <img src={logout} alt="Logout" className="w-4.1 h-5" />
                Logout
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
