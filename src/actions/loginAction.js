export const loginAction = (content) => {
    return (
        {
            type: "LOGIN",
            payload:{
               isLoggedIn : content.isLoggedIn,
               profile: content.profile
            }
        }
    )
};