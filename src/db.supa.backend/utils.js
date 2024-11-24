import Cookies from "js-cookie";
import { useEffect } from "react";

export const dateFormatter = (dateString) => {
    const date = new Date(dateString);

    // Format the date as desired
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
}


export const dateFormatterAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return `${seconds} seconds ago`;
    } else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days === 1) {
        return 'Yesterday';
    } else if (days < 30) {
        return `${days} days ago`;
    } else if (days < 365) {
        const months = Math.floor(days / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(days / 365);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}



export const useCurrentUser = () => {
    useEffect(() => {
        const redirectTo = (path) => {
            window.location.href = path;
        };

        const getUserData = () => {
            const userCookie = Cookies.get('token');
            const user = userCookie ? JSON.parse(userCookie) : {};
            return {
                isAdmin: user.role === 1,
                hasToken: user.role === 0,
                currentLocation: window.location.pathname,
            };
        };

        const handleRedirection = ({ isAdmin, hasToken, currentLocation }) => {
            if (!isAdmin && !hasToken) {
                // User is not authenticated
                if (currentLocation === '/admin' || currentLocation === '/profile') {
                    redirectTo('/signin'); // Redirect to sign-in for both admin and profile
                }
            } else if (isAdmin) {
                // User is an admin
                if (currentLocation !== '/admin') {
                    redirectTo('/admin'); // Redirect to admin page
                }
            } else {
                // User is authenticated but not an admin
                if (currentLocation === '/admin') {
                    redirectTo('/'); // Redirect to profile if trying to access admin
                }
                if (currentLocation === '/signin' || currentLocation === '/signup') {
                    redirectTo('/');
                }
            }
        };

        const userData = getUserData();
        handleRedirection(userData);
    }, []);
};


export const getCurrentUser = () => {
    const userCookie = Cookies.get('token');
    const user = userCookie ? JSON.parse(userCookie) : {};

    return { ...user }
}

export const signout = () => {
    Cookies.remove('token');
    window.location.reload();
}