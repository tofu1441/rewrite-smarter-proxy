import './globals.css'

export const metadata = {
  title: 'Rewrite Smarter',
  description: 'Make your writing sound more confident and clear with AI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
