import ReactDOM from 'react-dom'
import { useEffect } from 'react'

interface ModalFormProps {
  isVisible: boolean
  onClose: () => void
  children: React.ReactNode
}

export function ModalForm({ isVisible, onClose, children }: ModalFormProps) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  function handleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLDivElement
    if (target.id === 'wrapper') {
      onClose()
    }
  }

  return ReactDOM.createPortal(
    <div
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={(e) => handleClose(e)}
    >
      <div className="relative w-[627px] bg-white p-6 rounded shadow-lg">
        <button
          className="absolute text-black right-5 top-3 text-lg"
          onClick={() => onClose()}
        >
          x
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}
