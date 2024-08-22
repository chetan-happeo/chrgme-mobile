import { setItemAsync, getItemAsync } from "expo-secure-store";





class AuthHelper {
    private static instance: AuthHelper;
    private authToken: string = "";
    private refreshToken: string = "";
    private constructor() { }

    async saveTokens(authToken: string, refreshToken: string) {
        await setItemAsync("authToken", authToken);
        await setItemAsync("refreshToken", refreshToken);
    }

    async loadTokens() {
        const authToken = await getItemAsync("authToken");
        const refreshToken = await getItemAsync("refreshToken");
        return { authToken, refreshToken };
    }

    public static getInstance(): AuthHelper {
        if (!AuthHelper.instance) {
            AuthHelper.instance = new AuthHelper();
        }
        return AuthHelper.instance;
    }

    async clearTokens() {
        await setItemAsync("authToken", "");
        await setItemAsync("refreshToken", "");
    }

    public async init() {
        const { authToken, refreshToken } = await this.loadTokens();
        if (authToken && refreshToken) {
            this.authToken = authToken;
            this.refreshToken = refreshToken;
        }
        return this;
    }

    public get tokens() {
        return { authToken: this.authToken, refreshToken: this.refreshToken };
    }
}

export default AuthHelper.getInstance();