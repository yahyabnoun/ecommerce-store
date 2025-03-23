/* eslint-disable @typescript-eslint/no-explicit-any */
import { logoutUser, refreshToken, Tokens, UserProps, UserRole } from "@/api/Auth";
import React, { useEffect, useLayoutEffect } from "react";
import { api } from "@/setup/axios";
import { showToast } from "@/components/ShowToast";

type AuthStatus = "authenticated" | "unauthenticated" | "loading";
type AuthContextProps = {
    afterSuccessfullLogin: (
        tokens: Tokens,
        user: UserProps,
        shouldMakeUserAuthenticated?: boolean
    ) => string;
    logout: () => void;
    makeUserAuthenticated: () => void;
    user?: UserProps;
    authStatus: AuthStatus;
};

const AuthContext = React.createContext({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tokens, setTokens] = React.useState<Tokens | undefined>({
        access: "",
        refresh: "",
    });
    const [user, setUser] = React.useState<UserProps | undefined>(undefined);
    const [authStatus, setAuthStatus] = React.useState<AuthStatus>("loading");

    const afterLogout = () => {
        setTokens(undefined);
        setUser(undefined);
        setAuthStatus("unauthenticated");
    };

    const logout = () => {
        logoutUser()
            .then(() => {
                afterLogout();
                showToast("success", "Déconnexion réussie");
            })
            .catch(() => {
                showToast(
                    "error",
                    "Nous avons rencontré une erreur lors de la tentative de déconnexion"
                );
            });
    };

    const makeUserAuthenticated = () => {
        setAuthStatus("authenticated");
    };
    const afterSuccessfullLogin = (
        tokens: Tokens,
        user: UserProps,
        shouldMakeUserAuthenticated = true
    ) => {
        setTokens(tokens);
        setUser(user);
        if (shouldMakeUserAuthenticated) makeUserAuthenticated();

        if (!user) return "/";
        if (user.role === UserRole.ADMIN) return "";
        if (user.role === UserRole.CUSTOMER) return "";
        else return "";
    };

    useEffect(() => {});

    useLayoutEffect(() => {
        refreshToken()
            .then((response) => {
                setTokens(response.data.tokens);
                setUser(response.data.user);
                setAuthStatus("authenticated");
            })
            .catch(() => {
                setAuthStatus("unauthenticated");
            });
    }, []);

    useLayoutEffect(() => {
        const reqInterceptorId = api.interceptors.request.use((config) => {
            const is_retry_request = (config as any)["re_try"] as boolean;

            if (tokens?.access && !is_retry_request) {
                config.headers["authorization"] = `JWT ${tokens.access}`;
            }
            if (config.url?.includes("logout")) {
                console.log({ tokens, config });
            }

            return config;
        });
        const lockResInterceptorId = api.interceptors.response.use(
            (response) => response,
            (error) => {
                const LOCK_STATUS_CODE = 423;

                if (error.response?.status === LOCK_STATUS_CODE) {
                    showToast(
                        "error",
                        "Cette action ne peut pas être effectuée pour le moment, réessayez plus tard"
                    );
                    return new Promise(() => {});
                    // throw ;
                    // afterLogout();
                    // return error;
                }

                return Promise.reject(error);
            }
        );

        const resInterceptorId = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const is_retry_request = error.config["re_try"] as boolean;
                if (error.response?.status === 401) {
                    if(authStatus === "unauthenticated") {
                        return Promise.reject(error);
                    }

                    if (is_retry_request) {
                        afterLogout();
                        return error;
                    }

                    try {
                        error.config["re_try"] = true;
                        const response = await refreshToken(tokens?.refresh, true);

                        setTokens(response.data.tokens);
                        error.config.headers[
                            "Authorization"
                        ] = `JWT ${response.data.tokens.access}`;

                        return api.request(error.config);
                    } catch (_e) {
                        console.log("error refreshing token");
                        // logoutUser();
                        afterLogout();
                        showToast("error", "Votre session a expiré")
                        return Promise.reject(error);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.request.eject(reqInterceptorId);
            api.interceptors.response.eject(resInterceptorId);
            api.interceptors.response.eject(lockResInterceptorId);
        };
    }, [tokens, authStatus]);

    return (
        <AuthContext.Provider
            value={{
                afterSuccessfullLogin,
                user,
                authStatus,
                logout,
                makeUserAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};
