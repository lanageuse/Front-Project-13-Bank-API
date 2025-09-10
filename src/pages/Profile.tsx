import { ProfileHeader, TransactionList } from "../features/profile";

/**
 * Page de profil utilisateur
 * @component
 * @description Affiche les informations du profil et la liste des transactions
 * @returns {JSX.Element} La page de profil complète
 */
const Profile = () => {
    return (  
        <>
        <ProfileHeader/>
        <TransactionList/>
        </>
    );
}
 
export default Profile;