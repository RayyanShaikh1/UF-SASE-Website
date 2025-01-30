import { DefaultCatchBoundary } from "@/client/components/DefaultCatchBoundary";
import { NotFound } from "@/client/components/NotFound";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import { AuthProvider } from "../AuthContext";
import Footer from "../components/navigation/Footer";
import Header from "../components/navigation/Header";

export const Route = createRootRoute({
  errorComponent: ({ error, reset }: ErrorComponentProps) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary error={error} reset={reset} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <AuthProvider>
      <RootDocument>
        <Outlet />
      </RootDocument>
    </AuthProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Red+Hat+Text:ital,wght@0,300..700;1,300..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Red+Hat+Text:ital,wght@0,300..700;1,300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          {/* Main Content Area */}
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
