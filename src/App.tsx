import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayout,
  notificationProvider,
  ThemedTitle,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import * as Icons from "@ant-design/icons";

import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { DataProvider } from "@refinedev/strapi-v4";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CompanyList } from "pages/companies";
import { ClientList } from "pages/clients";
import { ContactList, EditContact } from "pages/contacts";
import { MissionList } from "pages/missions";
import { CreateInvoice, EditInvoice, InvoiceList } from "pages/invoices";

const {
  UserAddOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  SlidersOutlined,
  FileAddOutlined,
} = Icons;

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            resources={[
              {
                name: "companies",
                list: "/companies",
                icon: <InfoCircleOutlined />,
              },
              {
                name: "clients",
                list: "/clients",
                icon: <TeamOutlined />,
              },
              {
                name: "contacts",
                list: "/contacts",
                edit: "/contacts/:id/edit",
                icon: <UserAddOutlined />,
              },
              {
                name: "missions",
                list: "/missions",
                icon: <SlidersOutlined />,
              },
              {
                name: "invoices",
                list: "/invoices",
                create: "/invoices/create",
                edit: "invoices/:id/edit",
                icon: <FileAddOutlined />,
              },
            ]}
            authProvider={authProvider}
            dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayout
                      Header={Header}
                      Title={({ collapsed }) => (
                        <ThemedTitle
                          collapsed={collapsed}
                          text="refine Invoice"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="companies" />}
                />
                <Route path="/companies">
                  <Route index element={<CompanyList />} />
                </Route>
                <Route path="/clients">
                  <Route index element={<ClientList />} />
                </Route>
                <Route path="/contacts">
                  <Route index element={<ContactList />} />
                  <Route path="/contacts/:id/edit" element={<EditContact />} />
                </Route>
                <Route path="/missions">
                  <Route index element={<MissionList />} />
                </Route>
                <Route path="/invoices">
                  <Route index element={<InvoiceList />} />
                  <Route path="/invoices/create" element={<CreateInvoice />} />
                  <Route path="/invoices/:id/edit" element={<EditInvoice />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route
                  path="/login"
                  element={
                    <AuthPage
                      type="login"
                      formProps={{
                        initialValues: {
                          email: "demo@refine.dev",
                          password: "demodemo",
                        },
                      }}
                    />
                  }
                />
              </Route>
              <Route
                element={
                  <Authenticated>
                    <ThemedLayout
                      Header={Header}
                      Title={({ collapsed }) => (
                        <ThemedTitle
                          collapsed={collapsed}
                          text="refine Invoice"
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayout>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
