import React, { useState } from 'react'
import { Toast as BootstrapToast, ToastContainer } from 'react-bootstrap'

interface ToastProps {
  initialMessage?: string
  initialType?: 'success' | 'danger'
}

const Toast: React.FC<ToastProps> = ({ initialMessage = '', initialType = 'success' }) => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState(initialMessage)
  const [toastType, setToastType] = useState(initialType)

  return (
    <ToastContainer className="p-3" style={{ zIndex: 9999 }}>
      <BootstrapToast
        bg={toastType === "success" ? "success" : "danger"}
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 9999,
        }}
      >
        <BootstrapToast.Header>
          <strong className="me-auto">
            {toastType === "success" ? "Başarılı" : "Hata"}
          </strong>
        </BootstrapToast.Header>
        <BootstrapToast.Body className="text-white">{toastMessage}</BootstrapToast.Body>
      </BootstrapToast>
    </ToastContainer>
  )
}

export default Toast