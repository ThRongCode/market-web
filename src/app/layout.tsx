import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { MUIProvider, QueryProvider, AuthProvider, NavigationProgressProvider } from "@/components/providers";
import { AppShell } from "@/components/layout";
import { Suspense } from "react";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ChoTot - Chợ trực tuyến mua bán mọi thứ',
    template: '%s | ChoTot',
  },
  description: 'Chợ trực tuyến hàng đầu Việt Nam. Mua bán bất động sản, xe cộ, điện tử, thời trang và nhiều hơn nữa.',
  keywords: ['mua bán', 'chợ trực tuyến', 'bất động sản', 'xe cộ', 'điện tử', 'thời trang'],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'ChoTot',
    title: 'ChoTot - Chợ trực tuyến mua bán mọi thứ',
    description: 'Chợ trực tuyến hàng đầu Việt Nam. Mua bán mọi thứ nhanh chóng và an toàn.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChoTot - Chợ trực tuyến mua bán mọi thứ',
    description: 'Chợ trực tuyến hàng đầu Việt Nam. Mua bán mọi thứ nhanh chóng và an toàn.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Material Symbols Outlined for MD3 icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={beVietnamPro.className}>
        <AuthProvider>
          <QueryProvider>
            <MUIProvider>
              <Suspense>
                <NavigationProgressProvider>
                  <AppShell>
                    {children}
                  </AppShell>
                </NavigationProgressProvider>
              </Suspense>
            </MUIProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
