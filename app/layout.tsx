"use client";
import {Inter} from 'next/font/google'
import './globals.css'
import {ReduxProvider} from '@/providers/ReduxProvider'
import {Toaster} from 'react-hot-toast';
import {useEffect} from 'react';
import addInterceptor from '@/libs/interceptor';
import {API} from '@/libs/client';
import {ThemeProvider} from "@/providers/ThemeProvider";
import { EquityReduxProvider } from '@/providers/EquityReduxProvider';
import Analytics from './analytics/Analytics';

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
        <head><!-- Google Tag Manager -->
			<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-PDF5CBRC');</script>
			<!-- End Google Tag Manager -->
	   </head>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <body className={inter.className}>
				<!-- Google Tag Manager (noscript) -->
		<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PDF5CBRC"
		height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<!-- End Google Tag Manager (noscript) -->
        
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
