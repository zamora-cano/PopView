import React, { useState, useEffect } from 'react';

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(true);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevenir la instalación automática
      e.preventDefault();
      // Guardar el evento para que se pueda activar más tarde
      setDeferredPrompt(e);
      // Mostrar el botón de instalación
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Mostrar el prompt de instalación
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log(choiceResult.outcome);
        // Resetear el estado para no mostrar el botón después de la instalación
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  if (!showInstallButton) return null;

  return (
    <button onClick={handleInstallClick}>
      Instalar App
    </button>
  );
};

export default InstallButton;
