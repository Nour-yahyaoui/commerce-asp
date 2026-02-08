// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ABIDI Mohamed Fadhel - Enseignant STI | Projet de Numérisation",
  description: "Portfolio professionnel de ABIDI Mohamed Fadhel, enseignant spécialisé en Systèmes et Technologies de l'Information. Découvrez le projet innovant de numérisation complète de la matière STI pour les élèves de 4ème année Sciences de l'Informatique.",
  keywords: [
    "ABIDI Mohamed Fadhel",
    "Enseignant STI",
    "Systèmes et Technologies de l'Information",
    "Numérisation éducation",
    "Lycée Monji Slim Sbiba",
    "Pédagogie numérique",
    "4ème année SI",
    "Sciences de l'Informatique",
    "Tunisie éducation",
    "Transformation numérique",
    "Ressources pédagogiques digitales",
    "Cours STI",
    "TPs STI",
    "TDs STI",
    "Quiz STI"
  ],
  authors: [{ name: "ABIDI Mohamed Fadhel" }],
  creator: "ABIDI Mohamed Fadhel",
  publisher: "ABIDI Mohamed Fadhel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://votre-domaine.com'), // Remplacez par votre domaine réel
  alternates: {
    canonical: '/',
    languages: {
      'fr-TN': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_TN',
    url: '/',
    title: 'ABIDI Mohamed Fadhel - Enseignant STI | Projet de Numérisation',
    description: 'Portfolio professionnel de ABIDI Mohamed Fadhel, enseignant spécialisé en Systèmes et Technologies de l\'Information.',
    siteName: 'Portfolio ABIDI Mohamed Fadhel',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#ffffff" />
        
        {/* Additional SEO tags */}
        <meta name="language" content="French" />
        <meta name="geo.region" content="TN" />
        <meta name="geo.placename" content="Tunisia" />
        <meta name="geo.position" content="34.0;9.0" />
        <meta name="ICBM" content="34.0, 9.0" />
        
        {/* Structured Data / Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "ABIDI Mohamed Fadhel",
              "jobTitle": "Enseignant en Systèmes et Technologies de l'Information",
              "worksFor": {
                "@type": "EducationalOrganization",
                "name": "Lycée Monji Slim Sbiba"
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Faculté des Sciences de Tunis"
              },
              "knowsAbout": [
                "Systèmes Informatiques",
                "Technologies de l'Information",
                "Pédagogie Numérique",
                "Transformation Digitale"
              ],
              "url": "https://votre-domaine.com",
              "sameAs": [
                "https://github.com/fodel",
                "https://www.facebook.com/mohamedelfadhel.abidi"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
        
      </body>
    </html>
  );
}