import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/pages/RootLayout";
import MainPage from "./components/pages/MainPage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ErrorPage from "./components/pages/ErrorPage";
import { UserPageProvider } from "./context/UserPageContext";
import UserPage, {
  loader as userPageLoader,
} from "./components/pages/UserPage";
import CollectionPage, {
  loader as collectionPageLoader,
} from "./components/pages/CollectionPage";
import ItemPage, {
  loader as ItemPageLoader,
} from "./components/pages/ItemPage";
import { AdminPage } from "./components/pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "admin", element: <AdminPage /> },
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
      {
        path: "user/:userId/collection/:collectionId",
        loader: collectionPageLoader,
        element: <CollectionPage />,
      },
      {
        path: "user/:userId/collection/:collectionId/item/:itemId",
        loader: ItemPageLoader,
        element: <ItemPage />,
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
