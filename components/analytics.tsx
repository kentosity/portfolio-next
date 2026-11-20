import Script from "next/script";

export function Analytics() {
  if (process.env.VERCEL_ENV !== "production") return null;
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Q2001QRBBW"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Q2001QRBBW');
    `}</Script>
      <Script id="clarity-analytics" strategy="afterInteractive">{`
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "v87uz3er5b");
    `}</Script>
    </>
  );
}
