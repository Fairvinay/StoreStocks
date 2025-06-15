"use client";
import {Inter} from 'next/font/google'
import './globals.css'
import {ReduxProvider} from '@/providers/ReduxProvider'
import {Toaster} from 'react-hot-toast';
import {useEffect} from 'react';
import addInterceptor from '@/libs/interceptor';
import { GTM_ID, pageview } from "@/libs/gtm"
import {API} from '@/libs/client';
import {ThemeProvider} from "@/providers/ThemeProvider";
import { EquityReduxProvider } from '@/providers/EquityReduxProvider';
import Analytics from './analytics/Analytics';
import Script from "next/script"
const inter = Inter({subsets: ['latin']})


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    useEffect(() => {
        addInterceptor(API)
    }, [])
    return (
        <html lang="en" className=''>
        <title>Store Notify Stocks</title>
        <head>{/* Google Tag Manager */}
         <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${GTM_ID}');
  `,
        }}
      />
	   </head>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <body className={inter.className}>
			 {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PDF5CBRC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <ReduxProvider>
            <EquityReduxProvider>
            <ThemeProvider>
                <>  <Analytics />
                    <Toaster/>
                    {children}
                </>
            </ThemeProvider>
            </EquityReduxProvider>
        </ReduxProvider>
        </body>
        </html>
    )
}
