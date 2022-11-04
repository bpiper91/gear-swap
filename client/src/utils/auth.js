import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    };

    loggedIn() {
        // checks for saved token
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        };
    };

    getToken() {
        // retrieves user token from localStorage
        return localStorage.getItem('id_token');
    };

    login(idToken) {
        // saves user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    };

    logout() {
        // clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // reload page and reset app state
        window.location.assign('/');
    };
};

export default new AuthService();