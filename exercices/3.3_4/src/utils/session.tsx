import type { AuthenticatedUser, MaybeAuthenticated } from "../components/types";

const storeAuthenticatedUser = (authenticated: AuthenticatedUser) => {
    localStorage.setItem("authenticatedUser", JSON.stringify(authenticated));
}

const getAuthenticatedUser = () : MaybeAuthenticated => {
    const authenticated = localStorage.getItem("authenticatedUser");

    if(!authenticated) return undefined;

    return JSON.parse(authenticated);
}

const clearAuthenticatedUser = () => {
    localStorage.removeItem("authenticatedUser");
}

export {storeAuthenticatedUser, clearAuthenticatedUser, getAuthenticatedUser};