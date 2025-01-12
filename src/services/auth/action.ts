import { api } from "@/lib/api";
import { AUTH_GITHUB_CALLBACK_ROUTE, GITHUB_AUTH_ROUTE } from "@/lib/routes";

interface GithubOAuthResponse {
  authorization_url: string;
}

interface GithubOAuthCallbackResponse {
  token: string;
}

export async function githubAuth() {
  try {
    const response = await api.get<GithubOAuthResponse>(GITHUB_AUTH_ROUTE());
    return response.data.authorization_url;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}

export async function githubAuthCallback(code: string) {
  try {
    const response = await api.get<GithubOAuthCallbackResponse>(
      AUTH_GITHUB_CALLBACK_ROUTE(code),
    );
    return response.data.token;
  } catch (error) {
    console.error("Error fetching callback data:", error);
    throw error;
  }
}
