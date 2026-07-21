import './globals.css'

export const metadata = {
  title: 'Young Rate - Global Currency Exchange Rates',
  description: 'Live world currency converter and exchange rate tracker',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
