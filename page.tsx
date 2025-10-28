
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Composants dynamiques
const AllocationHero = dynamic(() => import('./AllocationHero'), { ssr: false });
const CurrentAllocation = dynamic(() => import('./CurrentAllocation'), { ssr: false });
const AllocationModels = dynamic(() => import('./AllocationModels'), { ssr: false });
const RiskAnalysis = dynamic(() => import('./RiskAnalysis'), { ssr: false });
const ETFRecommendations = dynamic(() => import('./ETFRecommendations'), { ssr: false });
const RebalancingTools = dynamic(() => import('./RebalancingTools'), { ssr: false });
const ScenarioSimulator = dynamic(() => import('./ScenarioSimulator'), { ssr: false });
const MifidRecommendations = dynamic(() => import('./MifidRecommendations'), { ssr: false });

export default function AllocationPage() {
  const [mounted, setMounted] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeTab, setActiveTab] = useState('vue-ensemble');

  useEffect(() => {
    setMounted(true);
    
    // Données de démonstration du portefeuille
    const demoPortfolioData = {
      totalValue: 150000,
      allocations: [
        {
          name: 'Actions Européennes',
          percentage: 35,
          value: 52500,
          color: '#3B82F6',
          icon: 'ri-line-chart-line'
        },
        {
          name: 'Actions US',
          percentage: 25,
          value: 37500,
          color: '#10B981',
          icon: 'ri-stock-line'
        },
        {
          name: 'Obligations',
          percentage: 20,
          value: 30000,
          color: '#F59E0B',
          icon: 'ri-government-line'
        },
        {
          name: 'ETF Monde',
          percentage: 15,
          value: 22500,
          color: '#8B5CF6',
          icon: 'ri-global-line'
        },
        {
          name: 'Cash',
          percentage: 5,
          value: 7500,
          color: '#6B7280',
          icon: 'ri-bank-line'
        }
      ]
    };
    
    setPortfolioData(demoPortfolioData);
  }, []);

  const tabs = [
    { id: 'vue-ensemble', label: 'Vue d\'ensemble', icon: 'ri-pie-chart-line' },
    { id: 'ia-mifid', label: 'IA MiFID', icon: 'ri-brain-line' },
    { id: 'modeles', label: 'Modèles', icon: 'ri-stack-line' },
    { id: 'reequilibrage', label: 'Rééquilibrage', icon: 'ri-scales-3-line' },
    { id: 'analyse-risque', label: 'Analyse Risque', icon: 'ri-shield-check-line' },
    { id: 'etf-recommandes', label: 'ETF Recommandés', icon: 'ri-funds-line' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'vue-ensemble':
        return <CurrentAllocation portfolioData={portfolioData} />;
      case 'ia-mifid':
        return <MifidRecommendations />;
      case 'modeles':
        return <AllocationModels />;
      case 'reequilibrage':
        return <RebalancingTools portfolioData={portfolioData} />;
      case 'analyse-risque':
        return <RiskAnalysis portfolioData={portfolioData} />;
      case 'etf-recommandes':
        return <ETFRecommendations />;
      default:
        return <CurrentAllocation portfolioData={portfolioData} />;
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-white">Chargement de l'allocation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <AllocationHero />
      
      {/* Navigation par onglets */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Contenu de l'onglet actif */}
      <div className="container mx-auto px-4 py-12">
        {renderTabContent()}
      </div>
    </div>
  );
}
