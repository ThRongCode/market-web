import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { MUIProvider, QueryProvider, AuthProvider, NavigationProgressProvider } from "@/components/providers";
import { Header, Footer } from "@/components/layout";
import { Box } from "@mui/material";
import { Suspense } from "react";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
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
      <body className={roboto.className}>
        <AuthProvider>
          <QueryProvider>
            <MUIProvider>
              <Suspense>
                <NavigationProgressProvider>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '100vh',
                    }}
                  >
                    <Header />
                    <Box component="main" sx={{ flexGrow: 1 }}>
                      {children}
                    </Box>
                    <Footer />
                  </Box>
                </NavigationProgressProvider>
              </Suspense>
            </MUIProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
