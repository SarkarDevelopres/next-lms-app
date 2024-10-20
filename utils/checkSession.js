import { jwtDecode } from "jwt-decode";
export default function checkSession(tokenName) {
    const token = localStorage.getItem(`${tokenName}`);
    if (token) {
        var dateNow = new Date();
        var decodedToken = jwtDecode(token);

        if (decodedToken.exp < dateNow.getTime() / 1000) {
            localStorage.removeItem(`${tokenName}`);
            return false;
        }

        return true;
    }

    return false;
}
