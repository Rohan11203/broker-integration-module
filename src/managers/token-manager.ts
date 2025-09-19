interface ITokenInfo {
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
}

const createTokenManager = () => {
    // In-memory store 
    const userTokens: Map<string, ITokenInfo> = new Map();

    const isTokenExpired = (tokenInfo: ITokenInfo): boolean => {
        return new Date() >= tokenInfo.expiresAt;
    };

    const refreshAccessToken = async (userId: string, tokenInfo: ITokenInfo): Promise<ITokenInfo> => {
        console.log(`[TokenManager] Access token for user "${userId}" expired. Refreshing...`);

        await new Promise(resolve => setTimeout(resolve, 300));

        const refreshedTokenInfo: ITokenInfo = {
            ...tokenInfo,
            accessToken: `REFRESHED_ACCESS_TOKEN_${Date.now()}`,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Expires in 1 hour
        };

        userTokens.set(userId, refreshedTokenInfo);
        console.log(`[TokenManager] Token refreshed successfully for user "${userId}".`);
        return refreshedTokenInfo;
    };

    return {
        
        getToken: async (userId: string): Promise<string> => {
            console.log(`[TokenManager] Getting token for user: ${userId}`);
            let tokenInfo = userTokens.get(userId);

            if (!tokenInfo) {
                throw new Error(`No token information found for user ${userId}.`);
            }

            if (isTokenExpired(tokenInfo)) {
                tokenInfo = await refreshAccessToken(userId, tokenInfo);
            }

            return tokenInfo.accessToken;
        },

       
        _setInitialToken: (userId: string) => {
            // Set an EXPIRED token for demonstration purposes
            const expiredToken: ITokenInfo = {
                accessToken: 'INITIAL_EXPIRED_ACCESS_TOKEN_12345',
                refreshToken: 'STATIC_REFRESH_TOKEN_ABCDE',
                expiresAt: new Date(Date.now() - 1000), // Set expiry to 1 second in the past
            };
            userTokens.set(userId, expiredToken);
            console.log(`[TokenManager] Set initial (expired) token for user "${userId}" for demo.`);
        }
    };
};

// Export a single instance of the token manager
export const tokenManager = createTokenManager();

// demo user's token when the app starts
tokenManager._setInitialToken('testUser');