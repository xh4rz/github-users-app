import type { Metadata } from 'next';
import Providers from '@/components/themeRegistry/Providers';
import { AppBar } from '@/components/ui';

export const metadata: Metadata = {
	title: 'GitHub Usuarios App',
	description: 'Aplicación búsqueda de usuarios'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body suppressHydrationWarning>
				<Providers>
					<AppBar>{children}</AppBar>
				</Providers>
			</body>
		</html>
	);
}
