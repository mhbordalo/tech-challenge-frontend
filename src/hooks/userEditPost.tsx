import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
import { EditPost } from '../types'

export function useEditPost(): UseMutationResult<
  void,
  Error,
  EditPost,
  unknown
> {
  const queryClient = useQueryClient()

  const mutation = useMutation<void, Error, EditPost>({
    mutationFn: async ({ _id, title, content, img }) => {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token not found')
      }

      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      if (img instanceof File) {
        formData.append('img', img)
      } else {
        formData.append('img', img)
      }
    //   console.log(formData)

    //   console.log(_id)
    //   console.log(title)
    //   console.log(content)
    //   console.log(img)
      formData.forEach((value, key) => { console.log(`${typeof(key)}: ${typeof(value)}`); });

      const teste = await axios.patch(
        `https://tech-challenge-back-end.vercel.app/posts/${_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      //console.log('teste',teste.status.toString)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    },
  })

  return mutation
}
