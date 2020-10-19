export const loginAction = (content) => {
    return (
        {
            type: "LOGIN",
            payload:{
               isLoggedIn : true
            }
        }
    )
};