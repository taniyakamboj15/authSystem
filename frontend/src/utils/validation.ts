export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateEmail = (email: string): boolean => {
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    return passwordRegex.test(password);
};

export const getPasswordStrength = (password: string): string => {
    if (password.length < 8) return 'weak';
    if (!passwordRegex.test(password)) return 'medium';
    return 'strong';
};
