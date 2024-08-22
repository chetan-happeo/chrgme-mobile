class ApiClient {
    public readonly endpoints = {
        REFRESH_TOKEN: "/auth/token",
        STATION_OWNER_ADMIN: "/admin/charging-station-owner"
    }

    private readonly baseUrl: string;
    private accessToken: string;
    private refreshToken: string
    private initDone: boolean;
    private onTokenReshreshSuccess: (accessToken: string, refreshToken: string) => void;
    private onTokenRefreshFailed: (e: Error) => void;

    constructor() {
        this.baseUrl = 'http://192.168.0.103:8080';
        this.accessToken = '';
        this.refreshToken = '';
        this.onTokenReshreshSuccess = () => { };
        this.onTokenRefreshFailed = () => { };
        this.initDone = false;
    }

    public async init(
        accessToken: string,
        refreshToken: string,
        onTokenReshreshSuccess: (accessToken: string, refreshToken: string) => void,
        onTokenRefreshFailed: (e: Error) => void) {

        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.onTokenReshreshSuccess = onTokenReshreshSuccess;
        this.onTokenRefreshFailed = onTokenRefreshFailed;
        this.initDone = true;
        console.debug('Api client initialized');
    }


    public async fetch(input: string, init: RequestInit = {}, isRetry?: boolean): Promise<Response> {

        if (!this.initDone) {
            throw new Error('Api not initialized');
        }

        this.validateUrl(input);

        const response = await fetch(input, {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${this.accessToken}`,
            },
        });


        if (response.status === 401) {
            if (isRetry) {
                this.onTokenRefreshFailed(new TokenRefreshFailedError(response));
                return response;
            }
            await this.refreshTokens();
            return this.fetch(input, init, true);
        }

        if (response.ok && isRetry) {
            this.onTokenReshreshSuccess(this.accessToken, this.refreshToken);
        }

        return response;
    }

    private validateUrl(url: string) {
        if (!url.startsWith('/')) {
            throw new Error(`Invalid URL: ${url}, must start with "/". The URL should be relative to the API base URL.`);
        }
    }

    private async refreshTokens() {
        const response = await fetch(`${this.baseUrl}${this.endpoints.REFRESH_TOKEN}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.refreshToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to refresh tokens');
        }

        const { accessToken, refreshToken } = await response.json();
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

export class TokenRefreshFailedError extends Error {
    constructor(public readonly response: Response) {
        super('Failed to refresh tokens');
    }
}

export default new ApiClient();