import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ErrorPage from "./components/pages/ErrorPage";
import UserPage, {
  loader as userPageLoader,
} from "./components/pages/UserPage";
import RootLayout from "./components/pages/RootLayout";
import { UserPageProvider } from "./context/UserPageContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "user/:userId",
        loader: userPageLoader,
        element: (
          <UserPageProvider>
            <UserPage />
          </UserPageProvider>
        ),
      },
    ],
  },
  {
    path: "/log-in",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
