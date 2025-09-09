import { useProfile } from "../../hooks";

 
export const ProfileHeader= () => {
    const {user, isLoading} = useProfile()
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
        </div>
     );
}