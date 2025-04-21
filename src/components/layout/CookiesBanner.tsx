import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já tomou uma decisão
    const cookiesAction = localStorage.getItem("cookies_action");

    // Se não houver decisão prévia, mostrar o banner
    if (!cookiesAction) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookies_action", "accept");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookies_action", "reject");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className='bg-background fixed right-0 bottom-0 left-0 z-50 border-t p-4 shadow-md'>
      <div className='container mx-auto h-full'>
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex-1'>
            <p className='text-sm'>
              Este site utiliza cookies para coletar métricas de uso e para
              autenticação. Ao continuar navegando, você concorda com nossa
              política de cookies.
            </p>
          </div>
          <div className='flex items-center gap-2 self-end sm:self-auto'>
            <Button
              variant='outline'
              size='sm'
              onClick={handleReject}
              className='h-8 text-xs'
            >
              Rejeitar
            </Button>
            <Button
              variant='default'
              size='sm'
              onClick={handleAccept}
              className='h-8 text-xs'
            >
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
