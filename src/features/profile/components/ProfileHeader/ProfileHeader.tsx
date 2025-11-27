import { useProfile } from "../../hooks";
import { ProfileEditForm } from "../ProfileEditForm/ProfileEditForm";

/**
 * Composant du header 
 * @component
 * @description Composant du header 
 *  @returns {JSX.Element} Le header de la page profile
 */

export const ProfileHeader= () => {
    const {user, isLoading} = useProfile()
    // Affiche un état de chargement simple
    if(isLoading){
        return 'loading...'
    }
    return ( 
           <div className="header">
            <h1>
            Welcome back
            <br />
            {user.firstName ?? "undefined"} {user.lastName ?? "undefined"}
            </h1>
            <ProfileEditForm/>
        </div>
     );
}