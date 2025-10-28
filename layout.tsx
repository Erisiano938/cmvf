
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Allocation d\'Actifs',
  description: 'Optimisez votre allocation d\'actifs avec nos modèles de portefeuille, analyses de risque et recommandations ETF personnalisées.',
  keywords: 'allocation actifs, portefeuille, ETF, diversification, gestion risque, répartition investissement, modèles portefeuille',
  openGraph: {
    title: 'Allocation d\'Actifs | CMV Finance',
    description: 'Optimisez votre portefeuille avec nos outils d\'allocation d\'actifs professionnels.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Allocation d\'Actifs | CMV Finance',
    description: 'Optimisez votre portefeuille avec nos outils d\'allocation d\'actifs professionnels.',
  },
};

export default function AllocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Allocation d'Actifs CMV",
            "description": "Service d'optimisation d'allocation d'actifs et de gestion de portefeuille",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/allocation`,
            "provider": {
              "@type": "Organization",
              "name": "CMV Finance",
              "url": process.env.NEXT_PUBLIC_SITE_URL
            },
            "serviceType": "Financial Planning",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services d'Allocation",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Modèles de Portefeuille",
                    "description": "Modèles d'allocation adaptés à votre profil de risque"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Analyse de Risque",
                    "description": "Évaluation complète du risque de votre portefeuille"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Recommandations ETF",
                    "description": "Sélection d'ETF optimisée pour votre allocation"
                  }
                }
              ]
            }
          })
        }}
      />
      {children}
    </>
  );
}
