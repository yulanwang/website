import './globals.css'

export const metadata = {
  title: 'Oasis',
  description: 'Learn to make your ideas a reality',
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
