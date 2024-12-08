interface ModalFormProps {
  isVisible: boolean
  onClose: () => void
  children: React.ReactNode
}

export function ModalForm({
  isVisible,
  onClose,
  children,
}: ModalFormProps) {
  if (!isVisible) {
    return null
  }

  function handleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLDivElement;
    if (target.id === 'wrapper') {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-start mt-36"
      
      onClick={(e) => handleClose(e)}
    >
      <div className="relative w-[627px] flex flex-col">
        <button
          className="absolute text-black right-5 top-3 text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  )
}
