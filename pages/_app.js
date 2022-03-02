import "../styles/main.css";
import Navbar from "../Components/navbar";
import { ErrorBoundary } from "react-error-boundary";

import { Suspense, useEffect, useState } from "react";

function Spinner() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col ml-56 p-10">
      <div className="">Loading</div>
    </div>
  );
}

function SuspenseInitialRender({ fallback, children }) {
  function LifeCycle({ setInitialRenderToFalse }) {
    useEffect(() => {
      setInitialRenderToFalse();
    }, []);
  }
  let [isInitialRender, setInitialRender] = useState(true);

  if (isInitialRender) {
    return (
      <>
        <LifeCycle setInitialRenderToFalse={() => setInitialRender(false)} />
        {children}
      </>
    );
  } else {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default function ({ Component, pageProps }) {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <div className="flex">
          <Navbar />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <SuspenseInitialRender fallback={<Spinner />}>
              <Component {...pageProps} />
            </SuspenseInitialRender>
          </ErrorBoundary>
        </div>
      </Suspense>
    </>
  );
}
