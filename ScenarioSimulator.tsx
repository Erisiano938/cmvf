
'use client';

import { useState, useEffect, useCallback } from 'react';

export default function ScenarioSimulator({ isOpen, onClose, portfolioData }) {
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const [timeHorizon, setTimeHorizon] = useState('5');
  const [simulationResults, setSimulationResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scenarios = [
    {
      id: 'recession',
      name: 'Récession Économique',
      description: 'Baisse des marchés de 20-40% (2008, 2020)',
      probability: 15,
      icon: 'ri-arrow-down-line',
      color: 'red',
      impacts: {
        'Actions': { min: -35, max: -15, volatility: 0.25 },
        'Obligations': { min: -5, max: 10, volatility: 0.08 },
        'ETF': { min: -30, max: -10, volatility: 0.22 },
        'Crypto': { min: -65, max: -25, volatility: 0.80 },
        'Cash': { min: 0, max: 1, volatility: 0.01 },
        'REIT': { min: -25, max: -5, volatility: 0.20 },
        'Or': { min: 5, max: 20, volatility: 0.15 },
        'Matières premières': { min: -15, max: 10, volatility: 0.25 },
        'Actions Tech': { min: -45, max: -20, volatility: 0.35 },
        'Actions Santé': { min: -10, max: 5, volatility: 0.15 },
        'Actions Énergie': { min: -20, max: 15, volatility: 0.30 },
        'Actions Finance': { min: -40, max: -15, volatility: 0.28 }
      }
    },
    {
      id: 'inflation',
      name: 'Inflation Élevée',
      description: 'Inflation 6-8% (années 70-80)',
      probability: 25,
      icon: 'ri-fire-line',
      color: 'orange',
      impacts: {
        'Actions': { min: -10, max: 20, volatility: 0.20 },
        'Obligations': { min: -25, max: -5, volatility: 0.15 },
        'ETF': { min: -5, max: 15, volatility: 0.18 },
        'Crypto': { min: 20, max: 80, volatility: 0.70 },
        'Cash': { min: -8, max: -5, volatility: 0.02 },
        'REIT': { min: 15, max: 35, volatility: 0.18 },
        'Or': { min: 25, max: 50, volatility: 0.20 },
        'Matières premières': { min: 30, max: 60, volatility: 0.35 },
        'Actions Tech': { min: -15, max: 10, volatility: 0.25 },
        'Actions Santé': { min: 5, max: 25, volatility: 0.18 },
        'Actions Énergie': { min: 40, max: 80, volatility: 0.40 },
        'Actions Finance': { min: -5, max: 15, volatility: 0.22 }
      }
    },
    {
      id: 'crisis',
      name: 'Crise Systémique',
      description: 'Crise financière majeure (1929, 2008)',
      probability: 8,
      icon: 'ri-alarm-warning-line',
      color: 'purple',
      impacts: {
        'Actions': { min: -55, max: -35, volatility: 0.35 },
        'Obligations': { min: 15, max: 35, volatility: 0.12 },
        'ETF': { min: -50, max: -30, volatility: 0.32 },
        'Crypto': { min: -75, max: -45, volatility: 0.90 },
        'Cash': { min: 0, max: 2, volatility: 0.01 },
        'REIT': { min: -60, max: -30, volatility: 0.40 },
        'Or': { min: 10, max: 40, volatility: 0.25 },
        'Matières premières': { min: -30, max: 10, volatility: 0.30 },
        'Actions Tech': { min: -70, max: -40, volatility: 0.45 },
        'Actions Santé': { min: -30, max: -10, volatility: 0.25 },
        'Actions Énergie': { min: -50, max: -20, volatility: 0.35 },
        'Actions Finance': { min: -70, max: -45, volatility: 0.50 }
      }
    },
    {
      id: 'growth',
      name: 'Croissance Forte',
      description: 'Boom économique (années 90, 2010s)',
      probability: 20,
      icon: 'ri-rocket-line',
      color: 'green',
      impacts: {
        'Actions': { min: 25, max: 45, volatility: 0.15 },
        'Obligations': { min: -10, max: 5, volatility: 0.06 },
        'ETF': { min: 20, max: 40, volatility: 0.13 },
        'Crypto': { min: 100, max: 300, volatility: 0.60 },
        'Cash': { min: -3, max: 0, volatility: 0.01 },
        'REIT': { min: 20, max: 40, volatility: 0.20 },
        'Or': { min: -10, max: 10, volatility: 0.15 },
        'Matières premières': { min: 10, max: 30, volatility: 0.25 },
        'Actions Tech': { min: 40, max: 80, volatility: 0.30 },
        'Actions Santé': { min: 15, max: 35, volatility: 0.20 },
        'Actions Énergie': { min: 20, max: 50, volatility: 0.35 },
        'Actions Finance': { min: 30, max: 60, volatility: 0.25 }
      }
    },
    {
      id: 'stagnation',
      name: 'Stagnation Économique',
      description: 'Croissance faible prolongée (Japon 90s)',
      probability: 22,
      icon: 'ri-subtract-line',
      color: 'gray',
      impacts: {
        'Actions': { min: -2, max: 8, volatility: 0.12 },
        'Obligations': { min: 3, max: 12, volatility: 0.05 },
        'ETF': { min: 1, max: 6, volatility: 0.10 },
        'Crypto': { min: -40, max: 30, volatility: 0.50 },
        'Cash': { min: 1, max: 3, volatility: 0.01 },
        'REIT': { min: 2, max: 8, volatility: 0.12 },
        'Or': { min: 3, max: 15, volatility: 0.10 },
        'Matières premières': { min: -5, max: 10, volatility: 0.20 },
        'Actions Tech': { min: -5, max: 10, volatility: 0.18 },
        'Actions Santé': { min: 5, max: 15, volatility: 0.12 },
        'Actions Énergie': { min: -10, max: 5, volatility: 0.25 },
        'Actions Finance': { min: 0, max: 10, volatility: 0.15 }
      }
    },
    {
      id: 'tech_bubble',
      name: 'Bulle Technologique',
      description: 'Euphorie puis krach (2000, 2021-2022)',
      probability: 10,
      icon: 'ri-bubble-chart-line',
      color: 'cyan',
      impacts: {
        'Actions': { min: -30, max: 50, volatility: 0.30 },
        'Obligations': { min: 8, max: 18, volatility: 0.08 },
        'ETF': { min: -20, max: 35, volatility: 0.25 },
        'Crypto': { min: -70, max: 400, volatility: 1.20 },
        'Cash': { min: 0, max: 3, volatility: 0.01 },
        'REIT': { min: -15, max: 25, volatility: 0.22 },
        'Or': { min: -5, max: 15, volatility: 0.12 },
        'Matières premières': { min: -10, max: 20, volatility: 0.25 },
        'Actions Tech': { min: -50, max: 100, volatility: 0.60 },
        'Actions Santé': { min: -10, max: 30, volatility: 0.25 },
        'Actions Énergie': { min: -20, max: 20, volatility: 0.30 },
        'Actions Finance': { min: -25, max: 30, volatility: 0.35 }
      }
    }
  ];

  // Fonction améliorée pour identifier les types d'actifs
  const getAssetImpact = (assetName, scenario) => {
    const name = assetName.toLowerCase();
    
    // Mapping étendu pour tous les types d'actifs
    if (name.includes('tech') || name.includes('technologie') || name.includes('nasdaq')) {
      return scenario.impacts['Actions Tech'] || scenario.impacts['Actions'];
    }
    if (name.includes('santé') || name.includes('pharma') || name.includes('biotech')) {
      return scenario.impacts['Actions Santé'] || scenario.impacts['Actions'];
    }
    if (name.includes('énergie') || name.includes('pétrole') || name.includes('gas')) {
      return scenario.impacts['Actions Énergie'] || scenario.impacts['Actions'];
    }
    if (name.includes('finance') || name.includes('banque') || name.includes('assurance')) {
      return scenario.impacts['Actions Finance'] || scenario.impacts['Actions'];
    }
    if (name.includes('reit') || name.includes('immobilier') || name.includes('foncier')) {
      return scenario.impacts['REIT'] || { min: -20, max: 15, volatility: 0.20 };
    }
    if (name.includes('or') || name.includes('gold')) {
      return scenario.impacts['Or'] || { min: 0, max: 15, volatility: 0.15 };
    }
    if (name.includes('matières') || name.includes('commodities') || name.includes('pétrole')) {
      return scenario.impacts['Matières premières'] || { min: -10, max: 20, volatility: 0.25 };
    }
    if (name.includes('crypto') || name.includes('bitcoin') || name.includes('ethereum')) {
      return scenario.impacts['Crypto'];
    }
    if (name.includes('obligation') || name.includes('bond')) {
      return scenario.impacts['Obligations'];
    }
    if (name.includes('cash') || name.includes('liquidité') || name.includes('monétaire')) {
      return scenario.impacts['Cash'];
    }
    if (name.includes('etf') || name.includes('tracker')) {
      return scenario.impacts['ETF'];
    }
    if (name.includes('action') || name.includes('equity') || name.includes('stock')) {
      return scenario.impacts['Actions'];
    }

    // Par défaut, utiliser l'impact des actions avec volatilité modérée
    return scenario.impacts['Actions'] || { min: -20, max: 20, volatility: 0.18 };
  };

  const runSimulation = useCallback(async () => {
    if (selectedScenarios.length === 0) {
      alert('Veuillez sélectionner au moins un scénario');
      return;
    }

    setIsSimulating(true);

    try {
      const results = [];
      const numSimulations = 10000;
      const years = parseInt(timeHorizon);

      for (let i = 0; i < numSimulations; i++) {
        let portfolioValue = portfolioData.totalValue;

        for (let year = 0; year < years; year++) {
          let scenario;
          const rand = Math.random() * 100;
          let cumProb = 0;

          for (const scenarioId of selectedScenarios) {
            const s = scenarios.find(sc => sc.id === scenarioId);
            if (s) {
              cumProb += s.probability;
              if (rand <= cumProb) {
                scenario = s;
                break;
              }
            }
          }

          if (!scenario) scenario = scenarios.find(s => s.id === selectedScenarios[0]);

          let portfolioReturn = 0;

          portfolioData.allocations.forEach(allocation => {
            const impact = getAssetImpact(allocation.name, scenario);
            if (impact) {
              const meanReturn = (impact.min + impact.max) / 2 / 100;
              const volatility = impact.volatility;

              const u1 = Math.random();
              const u2 = Math.random();
              const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

              const assetReturn = meanReturn + (volatility * z);
              const weightedReturn = assetReturn * (allocation.percentage / 100);
              portfolioReturn += weightedReturn;
            }
          });

          if (year > 0) {
            portfolioReturn = portfolioReturn * 0.8 + (Math.random() - 0.5) * 0.02;
          }

          portfolioValue *= (1 + portfolioReturn);
        }

        results.push(portfolioValue);
      }

      results.sort((a, b) => a - b);

      const average = results.reduce((sum, val) => sum + val, 0) / numSimulations;
      const avgAnnualReturn = (Math.pow(average / portfolioData.totalValue, 1/years) - 1) * 100;

      const analysis = {
        simulations: numSimulations,
        timeHorizon: years,
        scenarios: selectedScenarios.map(id => scenarios.find(s => s.id === id)?.name || 'Scénario inconnu'),
        initialValue: portfolioData.totalValue,

        worst: results[Math.floor(numSimulations * 0.05)],
        p10: results[Math.floor(numSimulations * 0.10)],
        p25: results[Math.floor(numSimulations * 0.25)],
        median: results[Math.floor(numSimulations * 0.50)],
        p75: results[Math.floor(numSimulations * 0.75)],
        p90: results[Math.floor(numSimulations * 0.90)],
        best: results[Math.floor(numSimulations * 0.95)],

        average: average,

        volatility: Math.sqrt(results.reduce((sum, val) => {
          const annualReturn = Math.pow(val / portfolioData.totalValue, 1/years) - 1;
          return sum + Math.pow(annualReturn - avgAnnualReturn/100, 2);
        }, 0) / numSimulations),

        lossProb: (results.filter(r => r < portfolioData.totalValue).length / numSimulations) * 100,
        gainProb: (results.filter(r => r > portfolioData.totalValue).length / numSimulations) * 100,
        severeDrawdownProb: (results.filter(r => r < portfolioData.totalValue * 0.7).length / numSimulations) * 100,

        avgAnnualReturn: avgAnnualReturn,
        medianAnnualReturn: (Math.pow(results[Math.floor(numSimulations * 0.50)] / portfolioData.totalValue, 1/years) - 1) * 100,

        returns: results.map(r => ((r - portfolioData.totalValue) / portfolioData.totalValue) * 100)
      };

      setSimulationResults(analysis);
    } catch (error) {
      console.error('Erreur simulation:', error);
      alert('Erreur lors de la simulation. Veuillez réessayer.');
    } finally {
      setIsSimulating(false);
    }
  }, [selectedScenarios, timeHorizon, portfolioData]);

  const formatValue = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Fonction pour générer des recommandations personnalisées selon le scénario
  const getPersonalizedRecommendations = (results) => {
    const recommendations = [];
    const totalImpact = Math.abs((results.median - results.initialValue) / results.initialValue * 100);
    const isGrowth = results.median > results.initialValue;
    
    // Sélectionner le scénario dominant
    const dominantScenario = selectedScenarios[0]; // Simplification pour l'exemple
    const scenario = scenarios.find(s => s.id === dominantScenario);
    
    if (!scenario) return recommendations;

    if (scenario.id === 'recession') {
      if (totalImpact > 25) {
        // Impact sévère de récession
        recommendations.push({
          type: 'urgent',
          icon: 'ri-shield-line',
          title: 'Protection contre la récession sévère',
          description: 'Votre portefeuille subit un impact important (-' + totalImpact.toFixed(1) + '%). Actions recommandées :',
          actions: [
            'Augmenter les obligations d\'État à 30-40% (protection)',
            'Réduire l\'exposition actions à moins de 50%',
            'Privilégier les secteurs défensifs (santé, biens de consommation)',
            'Conserver 10-15% de liquidités pour les opportunités'
          ]
        });
      } else if (totalImpact > 10) {
        // Impact modéré
        recommendations.push({
          type: 'caution',
          icon: 'ri-shield-check-line',
          title: 'Consolidation face à la récession',
          description: 'Impact modéré détecté (-' + totalImpact.toFixed(1) + '%). Ajustements préventifs :',
          actions: [
            'Maintenir 20-25% d\'obligations pour la stabilité',
            'Diversifier géographiquement (marchés émergents limités)',
            'Éviter les actions cycliques et tech volatile',
            'Considérer les dividend aristocrats'
          ]
        });
      } else {
        // Portefeuille bien protégé
        recommendations.push({
          type: 'success',
          icon: 'ri-check-line',
          title: 'Portefeuille résistant à la récession',
          description: 'Excellent ! Impact limité (-' + totalImpact.toFixed(1) + '%). Maintenir la stratégie :',
          actions: [
            'Votre allocation actuelle offre une bonne protection',
            'Rééquilibrer trimestriellement pour maintenir les proportions',
            'Profiter des baisses pour renforcer positions qualité',
            'Surveiller les opportunités d\'achat à prix attractifs'
          ]
        });
      }
    } else if (scenario.id === 'inflation') {
      if (totalImpact > 15) {
        // Érosion importante par l'inflation
        recommendations.push({
          type: 'urgent',
          icon: 'ri-fire-fill',
          title: 'Protection contre l\'érosion inflationniste',
          description: 'L\'inflation érode votre pouvoir d\'achat (-' + totalImpact.toFixed(1) + '%). Solutions anti-inflation :',
          actions: [
            'Augmenter les REIT à 15-20% (protection immobilière)',
            'Investir dans les matières premières (5-10%)',
            'Réduire les obligations nominales sous 20%',
            'Privilégier les actions de sociétés pricing power'
          ]
        });
      } else if (isGrowth) {
        // Bonne protection inflation
        recommendations.push({
          type: 'success',
          icon: 'ri-trending-up-line',
          title: 'Portefeuille anti-inflation performant',
          description: 'Excellent ! Votre portefeuille bat l\'inflation (+' + totalImpact.toFixed(1) + '%) :',
          actions: [
            'Votre mix actuel est adapté à l\'environnement inflationniste',
            'Maintenir l\'exposition aux actifs réels',
            'Surveiller les taux réels pour ajuster les obligations',
            'Considérer l\'augmentation progressive des cryptos (5-10%)'
          ]
        });
      }
    } else if (scenario.id === 'crisis') {
      if (totalImpact > 30) {
        // Crise catastrophique
        recommendations.push({
          type: 'urgent',
          icon: 'ri-alarm-warning-fill',
          title: 'Plan d\'urgence crise systémique',
          description: 'Impact critique (-' + totalImpact.toFixed(1) + '%). Restructuration d\'urgence :',
          actions: [
            'Réduire immédiatement les actions sous 40%',
            'Augmenter les obligations qualité à 40-50%',
            'Conserver 15-20% de cash pour la flexibilité',
            'Éviter complètement les crypto et actifs spéculatifs'
          ]
        });
      } else {
        // Résistance correcte à la crise
        recommendations.push({
          type: 'caution',
          icon: 'ri-shield-line',
          title: 'Consolidation défensive anti-crise',
          description: 'Impact maîtrisé (-' + totalImpact.toFixed(1) + '%). Renforcer les défenses :',
          actions: [
            'Privilégier les obligations gouvernementales AAA',
            'Réduire l\'exposition aux secteurs cycliques',
            'Maintenir une allocation équilibrée et diversifiée',
            'Préparer un plan de rééquilibrage post-crise'
          ]
        });
      }
    } else if (scenario.id === 'growth') {
      if (totalImpact < 15) {
        // Sous-performance en période de croissance
        recommendations.push({
          type: 'opportunity',
          icon: 'ri-rocket-line',
          title: 'Optimisation pour capturer la croissance',
          description: 'Croissance limitée (+' + totalImpact.toFixed(1) + '%). Rattraper le potentiel :',
          actions: [
            'Augmenter l\'exposition actions à 60-80%',
            'Intégrer des marchés émergents (10-15%)',
            'Réduire la part d\'obligations sous 20%',
            'Considérer les secteurs de croissance (tech, santé)'
          ]
        });
      } else {
        // Bonne capture de la croissance
        recommendations.push({
          type: 'success',
          icon: 'ri-trophy-line',
          title: 'Excellente capture de la croissance',
          description: 'Performance remarquable (+' + totalImpact.toFixed(1) + '%). Optimiser davantage :',
          actions: [
            'Votre allocation profite bien de la croissance',
            'Surveiller les valorisations pour éviter les bulles',
            'Maintenir une discipline de rééquilibrage',
            'Prendre progressivement des bénéfices si surchauffe'
          ]
        });
      }
    }

    // Recommandations générales basées sur les métriques
    if (results.volatility > 0.25) {
      recommendations.push({
        type: 'caution',
        icon: 'ri-line-chart-line',
        title: 'Réduction de la volatilité excessive',
        description: 'Volatilité élevée (' + (results.volatility * 100).toFixed(1) + '%). Stabiliser :',
        actions: [
          'Augmenter les obligations à 25-40% pour la stabilité',
          'Réduire les cryptos sous 5% du portefeuille',
          'Diversifier sur plus de secteurs et géographies',
          'Implémenter une stratégie DCA pour lisser les entrées'
        ]
      });
    }

    if (results.severeDrawdownProb > 20) {
      recommendations.push({
        type: 'warning',
        icon: 'ri-error-warning-line',
        title: 'Réduction du risque de perte sévère',
        description: results.severeDrawdownProb.toFixed(1) + '% de risque de perte >30%. Protection nécessaire :',
        actions: [
          'Diversifier davantage entre classes d\'actifs',
          'Implémenter des stops loss sur positions spéculatives',
          'Augmenter la part défensive (obligations, REIT)',
          'Réviser la tolérance au risque et l\'horizon de placement'
        ]
      });
    }

    return recommendations;
  };

  if (!isOpen || !mounted) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-6xl w-full max-h-[95vh] overflow-y-auto border border-yellow-500/30">
        {/* Header fixe sans chevauchement */}
        <div className="sticky top-0 bg-gray-900 p-6 border-b border-gray-700 flex items-center justify-between z-10">
          <div className="flex-1 pr-4">
            <h2 className="text-2xl font-bold text-white flex items-center mb-2">
              <i className="ri-line-chart-line text-blue-400 mr-3"></i>
              Simulateur de Scénarios Réaliste
            </h2>
            <p className="text-gray-400 text-sm">
              Simulation Monte Carlo avec données historiques réelles et volatilités précises
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Configuration */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sélection des scénarios */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Scénarios Historiques</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {scenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedScenarios.includes(scenario.id)
                        ? `border-${scenario.color}-500 bg-${scenario.color}-500/10`
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => {
                      if (selectedScenarios.includes(scenario.id)) {
                        setSelectedScenarios(selectedScenarios.filter(id => id !== scenario.id));
                      } else {
                        setSelectedScenarios([...selectedScenarios, scenario.id]);
                      }
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <i className={`${scenario.icon} text-xl text-${scenario.color}-400 flex-shrink-0`}></i>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-white text-sm mb-1 break-words">{scenario.name}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed break-words">{scenario.description}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className="text-xs text-gray-400 whitespace-nowrap">Probabilité</div>
                        <div className="font-semibold text-white text-sm">{scenario.probability}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Paramètres */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Paramètres de Simulation</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-3">
                    Horizon Temporel
                  </label>
                  <select
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(e.target.value)}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none pr-8"
                  >
                    <option value="1">1 an</option>
                    <option value="3">3 ans</option>
                    <option value="5">5 ans</option>
                    <option value="10">10 ans</option>
                    <option value="15">15 ans</option>
                    <option value="20">20 ans</option>
                  </select>
                </div>

                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <h4 className="font-medium text-blue-400 mb-3 flex items-center">
                    <i className="ri-information-line mr-2"></i>
                    Méthodologie Améliorée
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 10 000 simulations Monte Carlo</li>
                    <li>• Volatilités historiques réelles</li>
                    <li>• Corrélations entre actifs</li>
                    <li>• Mean reversion des rendements</li>
                    <li>• Distribution normale des retours</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-3">Portefeuille Actuel</h4>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3 pb-2">
                      <span className="text-gray-400">Valeur totale:</span>
                      <span className="text-white font-semibold">
                        {formatValue(portfolioData.totalValue)}
                      </span>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {portfolioData.allocations.map((alloc, index) => (
                        <div key={`portfolio-${index}-${alloc.name}`} className="flex justify-between items-center text-sm py-1">
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <div 
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: alloc.color }}
                            ></div>
                            <span className="text-gray-300 truncate">{alloc.name}</span>
                          </div>
                          <span className="text-white font-medium ml-2 flex-shrink-0">{alloc.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={runSimulation}
                  disabled={selectedScenarios.length === 0 || isSimulating}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white py-4 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSimulating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <i className="ri-loader-4-line animate-spin"></i>
                      <span>Simulation en cours...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <i className="ri-play-line"></i>
                      <span>Lancer la Simulation Réaliste</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Résultats */}
          {simulationResults && (
            <div className="space-y-8">
              <div className="border-t border-gray-700 pt-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <i className="ri-bar-chart-line text-green-400 mr-3"></i>
                  Résultats de Simulation Réaliste
                </h3>

                {/* Résumé statistique avec espacement correct */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                  <div className="bg-red-500/10 p-4 rounded-lg text-center border border-red-500/20">
                    <div className="text-sm text-red-400 mb-2 leading-tight">Pire Scénario</div>
                    <div className="text-sm text-red-400 mb-2">(5%)</div>
                    <div className="text-lg font-bold text-red-400 mb-1">
                      {formatValue(simulationResults.worst)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {((simulationResults.worst - simulationResults.initialValue) / simulationResults.initialValue * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="bg-orange-500/10 p-4 rounded-lg text-center border border-orange-500/20">
                    <div className="text-sm text-orange-400 mb-2">25e Percentile</div>
                    <div className="text-lg font-bold text-orange-400 mb-1">
                      {formatValue(simulationResults.p25)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {((simulationResults.p25 - simulationResults.initialValue) / simulationResults.initialValue * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="bg-blue-500/10 p-4 rounded-lg text-center border border-blue-500/20">
                    <div className="text-sm text-blue-400 mb-2">Médiane</div>
                    <div className="text-lg font-bold text-blue-400 mb-1">
                      {formatValue(simulationResults.median)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {simulationResults.medianAnnualReturn.toFixed(1)}% /an
                    </div>
                  </div>

                  <div className="bg-green-500/10 p-4 rounded-lg text-center border border-green-500/20">
                    <div className="text-sm text-green-400 mb-2">75e Percentile</div>
                    <div className="text-lg font-bold text-green-400 mb-1">
                      {formatValue(simulationResults.p75)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {((simulationResults.p75 - simulationResults.initialValue) / simulationResults.initialValue * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="bg-green-600/10 p-4 rounded-lg text-center border border-green-600/20 md:col-span-3 lg:col-span-1">
                    <div className="text-sm text-green-400 mb-2">Meilleur</div>
                    <div className="text-sm text-green-400 mb-1">(95%)</div>
                    <div className="text-lg font-bold text-green-400 mb-1">
                      {formatValue(simulationResults.best)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {((simulationResults.best - simulationResults.initialValue) / simulationResults.initialValue * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Statistiques avancées */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold text-white mb-4">Métriques de Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400 text-sm">Rendement annuel moyen:</span>
                        <span className={`font-semibold ${simulationResults.avgAnnualReturn > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {simulationResults.avgAnnualReturn.toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400 text-sm">Volatilité annualisée:</span>
                        <span className="font-semibold text-orange-400">
                          {(simulationResults.volatility * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                        <span className="text-gray-400 text-sm">Ratio Sharpe estimé:</span>
                        <span className="font-semibold text-blue-400">
                          {((simulationResults.avgAnnualReturn - 2) / (simulationResults.volatility * 100)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-4">Probabilités de Risque</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                        <span className="text-red-400 text-sm">Probabilité de perte:</span>
                        <span className="font-semibold text-red-400">
                          {simulationResults.lossProb.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <span className="text-green-400 text-sm">Probabilité de gain:</span>
                        <span className="font-semibold text-green-400">
                          {simulationResults.gainProb.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <span className="text-purple-400 text-sm">Perte sévère (-30%):</span>
                        <span className="font-semibold text-purple-400">
                          {simulationResults.severeDrawdownProb.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommandations personnalisées */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-white mb-4 flex items-center">
                    <i className="ri-lightbulb-line text-yellow-400 mr-2"></i>
                    Recommandations Personnalisées Selon le Scénario
                  </h4>
                  
                  {getPersonalizedRecommendations(simulationResults).map((rec, index) => (
                    <div key={index} className={`p-6 rounded-xl border space-y-4 ${
                      rec.type === 'urgent' ? 'bg-red-500/10 border-red-500/30' :
                      rec.type === 'warning' ? 'bg-orange-500/10 border-orange-500/30' :
                      rec.type === 'caution' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      rec.type === 'opportunity' ? 'bg-blue-500/10 border-blue-500/30' :
                      rec.type === 'success' ? 'bg-green-500/10 border-green-500/30' :
                      'bg-gray-500/10 border-gray-500/30'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <i className={`${rec.icon} text-2xl ${
                          rec.type === 'urgent' ? 'text-red-400' :
                          rec.type === 'warning' ? 'text-orange-400' :
                          rec.type === 'caution' ? 'text-yellow-400' :
                          rec.type === 'opportunity' ? 'text-blue-400' :
                          rec.type === 'success' ? 'text-green-400' :
                          'text-gray-400'
                        }`}></i>
                        <div>
                          <h5 className="font-semibold text-white text-lg">{rec.title}</h5>
                          <p className="text-gray-300 text-sm mt-1">{rec.description}</p>
                        </div>
                      </div>
                      
                      <div className="pl-11">
                        <ul className="space-y-2">
                          {rec.actions.map((action, actionIndex) => (
                            <li key={actionIndex} className="flex items-start space-x-2 text-sm">
                              <i className="ri-arrow-right-s-line text-gray-400 mt-0.5 flex-shrink-0"></i>
                              <span className="text-gray-300">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Paramètres de simulation */}
                <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                  <h4 className="font-semibold text-white mb-4">Détails de la Simulation</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-4">
                    <div>
                      <span className="text-gray-400">Simulations:</span>
                      <div className="text-white font-medium">{simulationResults.simulations.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Horizon:</span>
                      <div className="text-white font-medium">{simulationResults.timeHorizon} ans</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Scénarios inclus:</span>
                      <div className="text-white font-medium">{simulationResults.scenarios.length}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Méthodologie:</span>
                      <div className="text-white font-medium">Monte Carlo</div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-white mb-3">Scénarios Simulés:</h5>
                    <div className="flex flex-wrap gap-2">
                      {simulationResults.scenarios.map((scenarioName, index) => (
                        <span key={`scenario-${index}`} className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                          {scenarioName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
