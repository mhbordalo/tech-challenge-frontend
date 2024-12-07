<<<<<<< HEAD
import { useState } from 'react'
import CardHome from './components/CardHome'
import ModalForm from './components/ModalForm'
import listaPostsJson from './utils/postsMock.json'
import { FormPost } from './components/FormPost'
import { Post } from './types'
=======
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
>>>>>>> 4b73008007be3829a3768e356db6edaa9aa24b97

const queryClient = new QueryClient();

export default function App() {
  const [listPosts, setListPosts] = useState<Post[]>(listaPostsJson)
  const [showModal, setShowModal] = useState(false)
  const [postToEdit, seTpostToEdit] = useState<Post>({
    id: 0,
    name: '',
    title: '',
    content: '',
    image: '',
  })

  function handleDeletePost(id: number): void{
    const newList = listPosts.filter(post => post.id !== id);
    setListPosts(newList.sort((a, b) => a.id - b.id))
  }


  function handleEditedPostList(postEdited: Post): void{
    const newlist = listPosts.filter(post => post.id !== postEdited.id);
    newlist.push(postEdited)
    setListPosts(newlist.sort((a, b) => a.id - b.id));
    
  }


  return (
<<<<<<< HEAD
    <>
      <div className="container max-lg mx-auto flex flex-wrap justify-center">
        {listPosts.map((post) => (
          <CardHome
            post={post}
            key={post.id}
            admin={true}
            seTpostToEdit={seTpostToEdit}
            setShowModal={setShowModal}
            handleDeletePost={handleDeletePost}

          />
        ))}
      </div>
      <ModalForm isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">
            <FormPost postToEdit={postToEdit} handleEditedPostList={handleEditedPostList} />
          </h3>
        </div>
      </ModalForm>
    </>
=======
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
>>>>>>> 4b73008007be3829a3768e356db6edaa9aa24b97
  )
}
