import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { NotFound } from "./components/layout/NotFound";
import { HomePage } from "./pages/Index.page";
import { PrivacyPage } from "./pages/Privacy.page";
import { TermsPage } from "./pages/Terms.page";
import { AppLayout } from "./pages/_layout/App.layout";
import { AuthLayout } from "./pages/_layout/Auth.layout";
import { PublicLayout } from "./pages/_layout/Public.layout";
import { DashboardPage } from "./pages/app/Dashboard.page";
import { IncivilitiesPage } from "./pages/app/Incivilities.page";
import { RepositoriesPage } from "./pages/app/Repositories.page";
import { GithubAuthPage } from "./pages/auth/GithubAuth.page";
import { GithubAuthCallback } from "./pages/auth/GithubAuthCallback.page";
import { Providers } from "./providers";

const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in/github",
        element: <GithubAuthPage />,
      },
      {
        path: "sign-in/github/callback",
        element: <GithubAuthCallback />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "repositories",
        element: <RepositoriesPage />,
      },
      {
        path: "incivilities",
        element: <IncivilitiesPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);
export function App() {
  return (
    <>
      <Providers>
        <RouterProvider router={routes} />
      </Providers>
    </>
  );
}
