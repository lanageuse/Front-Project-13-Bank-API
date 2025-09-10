import FeaturesLayout from "../layouts/FeaturesLayout";
import Hero from "../UI/hero/Hero";

/**
 * Page d'accueil de l'application
 * @component
 * @description Affiche la section hero et la présentation des fonctionnalités
 * @returns {JSX.Element} La page d'accueil complète
 */
const Home= () => {
return ( 
        <>
        <Hero/>
        <FeaturesLayout/>
        </>
     );
}
 
export default Home;