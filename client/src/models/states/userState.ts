

export interface UserState {
    userName: string | null;
    role: string | null;
    email: string | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    permissions: string[];
}
