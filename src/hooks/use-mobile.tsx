import * as React from "react";

// Définition de la largeur maximale pour considérer l'affichage comme mobile.
const MOBILE_BREAKPOINT = 768;

// Hook personnalisé pour déterminer si l'écran est de taille mobile.
export function useIsMobile() {
  // État permettant de stocker si l'affichage est mobile ou non.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    // Création d'un MediaQueryList qui surveille la largeur de l'écran.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Fonction de rappel qui met à jour l'état en fonction de la largeur de l'écran.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Ajoute un écouteur d'événement pour détecter les changements de taille d'écran.
    mql.addEventListener("change", onChange);

    // Initialisation de l'état lors du premier rendu.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Nettoyage en retirant l'écouteur lorsque le composant est démonté.
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Retourne une valeur booléenne indiquant si l'affichage est mobile.
  return !!isMobile;
}
