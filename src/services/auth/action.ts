import { api, AUTH_GITHUB_CALLBACK_ROUTE, GITHUB_AUTH_ROUTE } from "@/lib/api";

interface GithubOAuthResponse {
  url: string;
}

interface GithubOAuthCallbackResponse {
  access_token: string;
}

export async function githubAuth() {
  try {
    const response = await api.get<GithubOAuthResponse>(GITHUB_AUTH_ROUTE());
    return response.data.url;
  } catch (error) {
    console.error("Error fetching storages:", error);
    throw error;
  }
}

export async function githubAuthCallback(code: string) {
  try {
    const response = await api.get<GithubOAuthCallbackResponse>(
      AUTH_GITHUB_CALLBACK_ROUTE(code)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching callback data:", error);
    throw error;
  }
}
