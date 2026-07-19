/**
 * Westlake Process Efficiency & Asset Metric Hub Dataset
 * Powered by Ingenero Physics-Informed Hybrid AI/ML Engine
 */

const WESTLAKE_DATA = {
  enterprise: {
    name: "Westlake Corporation",
    totalOpportunityYr: 5.24,     // $5.24 MM / year
    totalOpportunityDay: 0.01435, // $0.01435 MM / day ($14,356/day)
    processOpportunityYr: 3.12,   // $3.12 MM / year
    processOpportunityDay: 0.00855,
    assetOpportunityYr: 2.12,     // $2.12 MM / year
    assetOpportunityDay: 0.00580,
    currency: "USD",
    sitesCount: 4,
    totalFurnaces: 24,
    onlineFurnaces: 21,
    decokingFurnaces: 2,
    idleFurnaces: 1,

    // Proprietary Physics-Informed AI/ML Model Suite
    aiModels: [
      {
        id: "M-KIN",
        name: "Mechanistic Kinetic Severity Model",
        accuracy: "99.4%",
        type: "Physics-Informed Neural Network (PINN)",
        status: "ONLINE / ACTIVE",
        latency: "< 50ms",
        description: "Models multi-component feed cracking kinetics to optimize Ethylene/Propylene conversion ratios in real time."
      },
      {
        id: "M-SOFT",
        name: "Effluent Virtual Soft Sensor",
        accuracy: "98.9%",
        type: "Non-Linear Effluent Regressor",
        status: "ONLINE / ACTIVE",
        latency: "0 sec (Instant)",
        description: "Predicts gas chromatograph effluent matrix continuously, bypassing the 20-minute physical lab sampling delay."
      },
      {
        id: "M-CPR",
        name: "CPR Decoke Termination Predictor",
        accuracy: "99.1%",
        type: "Differential Pressure Kinetics Model",
        status: "ONLINE / ACTIVE",
        latency: "< 100ms",
        description: "Tracks online coil pressure drop trajectory to pinpoint exact decoke termination without steam-air tube damage (zero CO/CO2 dependence)."
      },
      {
        id: "M-CREEP",
        name: "Thermal-Creep & Lifetime Predictor",
        accuracy: "97.6%",
        type: "Multi-Variant Creep Damage ML",
        status: "ONLINE / ACTIVE",
        latency: "Batch Daily",
        description: "Calculates cumulative metallurgical creep strain (0.0–1.0) and predicts optimal retube replacement turnaround dates."
      },
      {
        id: "M-NLP",
        name: "SAP Maintenance NLP Classifier",
        accuracy: "96.8%",
        type: "Domain-Trained NLP Text Transformer",
        status: "ONLINE / ACTIVE",
        latency: "< 200ms",
        description: "Automatically parses unorganized SAP maintenance text logs to isolate Predictive, Reactive, and Emergency spend vectors."
      }
    ],

    // Reference AMH KPIs
    amhKpis: {
      plantsCount: 4,
      productsCount: 2, // Ethylene & Propylene
      totalAssets: 24,
      criticalAssets: 24,
      costEffectivenessIndex: "94.2%",
      criticalAssetReliability: "97.8%",
      reactiveWorkPct: "22.4%",
      overallAvailability: "98.6%",
      ytdMaintenanceExcellence: "First Quartile Baseline"
    },

    // Reference Process KPIs
    processKpis: {
      processEfficiency: "99.1%",
      predictedProductionOpp: "27.9 MT / day",
      energyEfficiency: "93.4%",
      overallThermalEfficiency: "92.8%",
      predictedCo2ReductionOpp: "41.2 MT / day",
      predictedEnergyReductionOpp: "664 MMBtu / day",
      nextDecokingFurnace: "Petro 1 - P1-F03 (in 48 hrs)"
    }
  },

  // Site Color Segregation
  siteColors: {
    calvert: { primary: "#FF6B00", name: "Calvert City Complex" },
    lacc: { primary: "#06B6D4", name: "LACC Ethylene" },
    petro1: { primary: "#10B981", name: "Petro 1 Olefins" },
    petro2: { primary: "#8B5CF6", name: "Petro 2 Olefins" }
  },

  // Domain Glossary Tooltips
  domainGlossary: {
    TMT: {
      title: "Tube Metal Temperature (TMT)",
      whatIsIt: "The skin temperature measured by thermocouples along the radiant coils inside the furnace firebox.",
      physicsModel: "Ingenero 3D circumferential thermal radiation model predicting local hot-spot formation.",
      financialImpact: "Preventing a single 1045°C hot-spot trip saves up to $0.680 MM/yr in avoided emergency repair and lost production."
    },
    CPR: {
      title: "Coil Pressure Drop (CPR Delta-P)",
      whatIsIt: "The differential pressure across radiant coil passes caused by internal coke deposition.",
      physicsModel: "Gas-phase hydraulic pressure drop kinetics tracking coke layer growth without relying on CO/CO2 gas analyzers.",
      financialImpact: "Pinpointing decoke termination saves 5 to 6 hours of downtime per decoke ($0.408 MM/yr across fleet)."
    },
    COT: {
      title: "Coil Outlet Temperature (COT)",
      whatIsIt: "The temperature of the hydrocarbon-steam effluent gas exiting the radiant coil into the transfer line exchanger.",
      physicsModel: "First-principles kinetic cracking model linking COT directly to Ethylene/Propylene conversion ratios.",
      financialImpact: "Optimizing COT by +3.5°C increases high-value monomer yield by +0.65 wt%, generating $0.940 MM/yr."
    },
    SHC: {
      title: "Steam-to-Hydrocarbon Ratio (SHC)",
      whatIsIt: "The mass ratio of dilution steam injected with the hydrocarbon feedstock into the furnace.",
      physicsModel: "Thermodynamic partial pressure model controlling hydrocarbon partial pressure and suppressing coke formation.",
      financialImpact: "Maintaining optimal 0.45 SHC ratio extends on-stream run lengths from 75 to 95 days."
    },
    ECI: {
      title: "Solomon Energy Intensity Index (ECI)",
      whatIsIt: "Global petrochemical industry benchmark measuring specific energy consumption relative to standard design baseline.",
      physicsModel: "Comparative benchmark analytics mapping Westlake assets against global 1st quartile ethylene producers.",
      financialImpact: "Driving all 24 Westlake furnaces into 1st quartile ECI captures up to $3.12 MM/yr in energy savings."
    },
    CREEP: {
      title: "Metallurgical Creep Damage Index",
      whatIsIt: "Cumulative high-temperature mechanical stress damage on radiant coil alloy tubes (scale 0.0 to 1.0).",
      physicsModel: "Larson-Miller parameter creep life algorithm tracking cumulative thermal stress history over operating years.",
      financialImpact: "Safely deferring premature retube turnarounds by 14 months saves $0.325 MM per furnace asset."
    },
    SOFTSENSOR: {
      title: "Virtual Effluent Soft Sensor",
      whatIsIt: "Real-time AI mathematical model predicting effluent chemical composition.",
      physicsModel: "Non-linear regression trained on historical gas chromatograph (GC) grab samples and online telemetry.",
      financialImpact: "Eliminates 20-minute physical GC delay, providing immediate closed-loop feed-forward severity control."
    }
  },

  // 4 Target Sites with Expanded AMH Maintenance Metrics
  sites: [
    {
      id: "calvert",
      name: "Calvert City Complex",
      location: "Calvert City, KY",
      color: "#FF6B00",
      totalFurnaces: 6,
      onlineFurnaces: 5,
      decokingFurnaces: 1,
      totalOpportunityYr: 1.42,
      processOppYr: 0.86,
      assetOppYr: 0.56,
      avgThermalEfficiency: 93.1,
      specificEnergy: 13.4,
      ethyleneYield: 34.2,
      propyleneYield: 14.8,
      
      // AMH Site Maintenance Metrics
      amhMetrics: {
        totalMaintSpendYrMM: 1.65,
        maintSpendPerDay: 4520,
        costPerTonEthylene: 18.5, // $18.5/MT
        totalWorkOrders: 107,
        unplannedBreakIns: 18,
        predictiveRatioPct: 65,
        reactiveRatioPct: 23,
        emergencyRatioPct: 12,
        mtbfDays: 142, // Mean Time Between Failures
        mttrHours: 14.2, // Mean Time To Repair
        laborEmployeesPct: 58,
        laborEmbeddedPct: 28,
        laborSpecializedPct: 14,
        componentSpendMM: {
          convection: 0.495,
          radiantCoils: 0.742,
          refractory: 0.248,
          burners: 0.165
        }
      }
    },
    {
      id: "lacc",
      name: "LACC Ethylene",
      location: "Lake Charles, LA",
      color: "#06B6D4",
      totalFurnaces: 8,
      onlineFurnaces: 7,
      decokingFurnaces: 1,
      totalOpportunityYr: 1.85,
      processOppYr: 1.12,
      assetOppYr: 0.73,
      avgThermalEfficiency: 92.8,
      specificEnergy: 13.6,
      ethyleneYield: 35.1,
      propyleneYield: 15.2,

      amhMetrics: {
        totalMaintSpendYrMM: 2.18,
        maintSpendPerDay: 5970,
        costPerTonEthylene: 16.8, // $16.8/MT
        totalWorkOrders: 124,
        unplannedBreakIns: 14,
        predictiveRatioPct: 68,
        reactiveRatioPct: 21,
        emergencyRatioPct: 11,
        mtbfDays: 168,
        mttrHours: 11.5,
        laborEmployeesPct: 62,
        laborEmbeddedPct: 26,
        laborSpecializedPct: 12,
        componentSpendMM: {
          convection: 0.654,
          radiantCoils: 0.981,
          refractory: 0.327,
          burners: 0.218
        }
      }
    },
    {
      id: "petro1",
      name: "Petro 1 Olefins",
      location: "Lake Charles, LA",
      color: "#10B981",
      totalFurnaces: 6,
      onlineFurnaces: 5,
      decokingFurnaces: 0,
      totalOpportunityYr: 1.15,
      processOppYr: 0.69,
      assetOppYr: 0.46,
      avgThermalEfficiency: 92.4,
      specificEnergy: 13.9,
      ethyleneYield: 33.8,
      propyleneYield: 14.5,

      amhMetrics: {
        totalMaintSpendYrMM: 1.67,
        maintSpendPerDay: 4575,
        costPerTonEthylene: 19.2, // $19.2/MT
        totalWorkOrders: 112,
        unplannedBreakIns: 21,
        predictiveRatioPct: 62,
        reactiveRatioPct: 25,
        emergencyRatioPct: 13,
        mtbfDays: 128,
        mttrHours: 16.8,
        laborEmployeesPct: 55,
        laborEmbeddedPct: 30,
        laborSpecializedPct: 15,
        componentSpendMM: {
          convection: 0.501,
          radiantCoils: 0.751,
          refractory: 0.251,
          burners: 0.167
        }
      }
    },
    {
      id: "petro2",
      name: "Petro 2 Olefins",
      location: "Lake Charles, LA",
      color: "#8B5CF6",
      totalFurnaces: 4,
      onlineFurnaces: 4,
      decokingFurnaces: 0,
      totalOpportunityYr: 0.82,
      processOppYr: 0.45,
      assetOppYr: 0.37,
      avgThermalEfficiency: 91.9,
      specificEnergy: 14.2,
      ethyleneYield: 33.2,
      propyleneYield: 14.1,

      amhMetrics: {
        totalMaintSpendYrMM: 1.32,
        maintSpendPerDay: 3616,
        costPerTonEthylene: 21.4, // $21.4/MT
        totalWorkOrders: 91,
        unplannedBreakIns: 24,
        predictiveRatioPct: 52,
        reactiveRatioPct: 30,
        emergencyRatioPct: 18,
        mtbfDays: 94,
        mttrHours: 19.5,
        laborEmployeesPct: 44,
        laborEmbeddedPct: 34,
        laborSpecializedPct: 22,
        componentSpendMM: {
          convection: 0.330,
          radiantCoils: 0.660,
          refractory: 0.198,
          burners: 0.132
        }
      }
    }
  ],

  // Executive & Module Prescriptions
  prescriptions: {
    level1: [
      {
        id: "P1-01",
        title: "Cross-Site Fleet Production Rebalancing",
        category: "Process Opportunity",
        impact: "$0.675 MM / yr ($0.00185 MM / day)",
        urgency: "HIGH",
        description: "Rebalance 4.5% feed load from Petro 2 (P2-F03, thermal efficiency 91.2%) to clean unit LACC (LF-201, efficiency 93.9%) to capture immediate margin upside.",
        action: "Execute load swing controller command in DCS optimizer."
      },
      {
        id: "P1-02",
        title: "Unplanned Maintenance Break-In Mitigation",
        category: "Asset Opportunity",
        impact: "$0.518 MM / yr ($0.00142 MM / day)",
        urgency: "MEDIUM",
        description: "Standardize predictive vibration and thermal scan schedule across Calvert City to reduce emergency contractor callouts by 34%.",
        action: "Deploy Module 2 SAP Work-Order Predictive Classifier rules."
      },
      {
        id: "P1-03",
        title: "Decoke Termination Optimization (Delta-P Kinetics)",
        category: "Process & Asset Combined",
        impact: "$0.408 MM / yr ($0.00112 MM / day)",
        urgency: "HIGH",
        description: "Terminate decoke cycle on Calvert CF-103 early based on stabilized differential pressure (CPR) return, avoiding 6 hours of unnecessary steam-air tube degradation.",
        action: "Instruct control room operators to initiate steam-flush transition."
      }
    ],
    module1: [
      {
        id: "M1-01",
        title: "Radiant Tube Hot-Spot Mitigation (Petro 1 - P1-F03)",
        impact: "$0.00068 MM / day ($680/day)",
        description: "Pass 4 TMT reading 1045°C due to local burner draft imbalance. Reduce burner #4 fuel valve position by 3.5%.",
        targetAsset: "P1-F03"
      },
      {
        id: "M1-02",
        title: "Severity Ratio Optimization (LACC Fleet)",
        impact: "$0.00094 MM / day ($940/day)",
        description: "Increase COT by 3.5°C on LF-201 and LF-204 while maintaining SHC ratio at 0.45 to boost Ethylene conversion yield by +0.65 wt%.",
        targetAsset: "LF-201"
      },
      {
        id: "M1-03",
        title: "Soft Sensor Calibration Alignment",
        impact: "$0.00042 MM / day ($420/day)",
        description: "Bypass physical GC sample delay (20 min) on Petro 2 feed header and utilize real-time effluent soft sensor feed-forward loop.",
        targetAsset: "P2-F01"
      }
    ],
    module2: [
      {
        id: "M2-01",
        title: "Contractor Labor Ratio Realignment",
        impact: "$0.456 MM / yr ($0.00125 MM / day)",
        description: "Shift routine convection section maintenance on Calvert CF-102 from specialized external contractors to embedded Westlake maintenance crew.",
        targetAsset: "CF-102"
      },
      {
        id: "M2-02",
        title: "Premature Retube Replacement Prevention",
        impact: "$0.325 MM / yr ($0.00089 MM / day)",
        description: "Coil age analysis on LF-206 indicates 6.8 years with low cumulative creep damage (0.42). Defer major retube turnaround by 14 months.",
        targetAsset: "LF-206"
      },
      {
        id: "M2-03",
        title: "SAP Work Order Categorization Optimization",
        impact: "$0.00054 MM / day ($540/day)",
        description: "Auto-classify 142 unassigned text log records in Petro 1 SAP database to isolate repeat burner tile failures.",
        targetAsset: "P1-F02"
      }
    ]
  },

  // 24 Furnaces Detailed Dataset
  furnaces: [
    // CALVERT CITY (6) - Color: #FF6B00
    {
      id: "CF-101",
      siteId: "calvert",
      siteName: "Calvert City",
      siteColor: "#FF6B00",
      name: "Furnace CF-101",
      sapId: "WLK-310101",
      designClass: "Lummus SF-4",
      manufacturer: "Koch Industries / Lummus",
      status: "ONLINE",
      runDays: 78,
      maxTargetRunDays: 95,
      thermalEfficiency: 93.4,
      specificEnergy: 13.2,
      ethyleneYield: 34.5,
      propyleneYield: 14.9,
      cokeThicknessMm: 2.8,
      deltaPressureBar: 0.38,
      coilAgeYears: 5.4,
      opportunityYrMM: 0.285,
      opportunityDayMM: 0.00078,
      processOppDayMM: 0.00048,
      assetOppDayMM: 0.00030,
      tmtPasses: [985, 992, 1005, 1012, 1008, 995, 988, 982],
      sapMaintenance: {
        totalCostYrMM: 0.285,
        costPerDay: 780,
        reliabilityScore: "98.2%",
        creepDamageIndex: 0.38,
        failureRiskRating: "LOW",
        predictivePct: 62,
        reactivePct: 24,
        emergencyPct: 14,
        repairVsReplace: "72% Repair / 28% Replace",
        laborMix: "55% Westlake Employees / 30% Embedded / 15% Specialized",
        componentScope: {
          convection: "$0.085 MM (30%)",
          radiantCoils: "$0.128 MM (45%)",
          refractory: "$0.043 MM (15%)",
          burners: "$0.029 MM (10%)"
        },
        workOrdersCount: 18
      },
      prescriptions: {
        process: [
          "Maintain current SHC ratio at 0.44. Run length projected to reach 95 days safely.",
          "Schedule predictive thermography check on Pass 4 in 10 days."
        ],
        amh: [
          "Maintain current predictive vibration scan frequency (every 14 days).",
          "Component scope allocation optimal; convection sootblowing efficiency at 92%."
        ]
      }
    },
    {
      id: "CF-102",
      siteId: "calvert",
      siteName: "Calvert City",
      siteColor: "#FF6B00",
      name: "Furnace CF-102",
      sapId: "WLK-310102",
      designClass: "Lummus SF-4",
      manufacturer: "Koch Industries / Lummus",
      status: "ONLINE",
      runDays: 88,
      maxTargetRunDays: 90,
      thermalEfficiency: 92.1,
      specificEnergy: 13.8,
      ethyleneYield: 33.6,
      propyleneYield: 14.2,
      cokeThicknessMm: 4.1,
      deltaPressureBar: 0.52,
      coilAgeYears: 7.2,
      opportunityYrMM: 0.410,
      opportunityDayMM: 0.00112,
      processOppDayMM: 0.00068,
      assetOppDayMM: 0.00044,
      tmtPasses: [1015, 1022, 1036, 1042, 1038, 1025, 1018, 1010],
      sapMaintenance: {
        totalCostYrMM: 0.410,
        costPerDay: 1123,
        reliabilityScore: "92.4%",
        creepDamageIndex: 0.74,
        failureRiskRating: "MEDIUM-HIGH",
        predictivePct: 45,
        reactivePct: 35,
        emergencyPct: 20,
        repairVsReplace: "58% Repair / 42% Replace",
        laborMix: "40% Westlake Employees / 35% Embedded / 25% Specialized",
        componentScope: {
          convection: "$0.102 MM (25%)",
          radiantCoils: "$0.225 MM (55%)",
          refractory: "$0.041 MM (10%)",
          burners: "$0.042 MM (10%)"
        },
        workOrdersCount: 26
      },
      prescriptions: {
        process: [
          "HOT-SPOT ALERT: Pass 4 TMT at 1042°C. Trim Pass 4 fuel valve by -2.8% immediately.",
          "Plan decoke cycle in 3 days; CPR delta-P approaching max limit (0.55 bar)."
        ],
        amh: [
          "High coil age (7.2 yrs) & elevated creep damage (0.74). Order radiant coil replacement bundle for Q4 turnaround.",
          "Shift convection section maintenance from specialized contractors to embedded crew to save $0.456 MM/yr."
        ]
      }
    },
    {
      id: "CF-103",
      siteId: "calvert",
      siteName: "Calvert City",
      siteColor: "#FF6B00",
      name: "Furnace CF-103",
      sapId: "WLK-310103",
      designClass: "Technip GK6",
      manufacturer: "TechnipFMC",
      status: "DECOKING",
      runDays: 0,
      maxTargetRunDays: 90,
      thermalEfficiency: 88.5,
      specificEnergy: 15.1,
      ethyleneYield: 31.0,
      propyleneYield: 13.2,
      cokeThicknessMm: 4.8,
      deltaPressureBar: 0.61,
      coilAgeYears: 4.8,
      opportunityYrMM: 0.346,
      opportunityDayMM: 0.00095,
      processOppDayMM: 0.00059,
      assetOppDayMM: 0.00036,
      tmtPasses: [820, 830, 845, 850, 840, 835, 825, 815],
      sapMaintenance: {
        totalCostYrMM: 0.320,
        costPerDay: 876,
        reliabilityScore: "95.1%",
        creepDamageIndex: 0.46,
        failureRiskRating: "LOW-MEDIUM",
        predictivePct: 58,
        reactivePct: 28,
        emergencyPct: 14,
        repairVsReplace: "68% Repair / 32% Replace",
        laborMix: "50% Westlake Employees / 35% Embedded / 15% Specialized",
        componentScope: {
          convection: "$0.096 MM (30%)",
          radiantCoils: "$0.144 MM (45%)",
          refractory: "$0.048 MM (15%)",
          burners: "$0.032 MM (10%)"
        },
        workOrdersCount: 22
      },
      prescriptions: {
        process: [
          "DECOKE KINETICS: CPR pressure differential stabilized at 0.12 bar baseline.",
          "Initiate steam-air ramp down now to save 5.5 hrs downtime ($0.00112 MM opportunity)."
        ],
        amh: [
          "Inspect burner wall refractory tiles during decoke window.",
          "Audit decoke steam valve positioner to prevent emergency seal leakage."
        ]
      }
    },
    {
      id: "CF-104",
      siteId: "calvert",
      siteName: "Calvert City",
      siteColor: "#FF6B00",
      name: "Furnace CF-104",
      sapId: "WLK-310104",
      designClass: "Lummus SF-4",
      manufacturer: "Koch Industries / Lummus",
      status: "ONLINE",
      runDays: 42,
      maxTargetRunDays: 95,
      thermalEfficiency: 93.8,
      specificEnergy: 13.1,
      ethyleneYield: 34.8,
      propyleneYield: 15.1,
      cokeThicknessMm: 1.8,
      deltaPressureBar: 0.28,
      coilAgeYears: 3.2,
      opportunityYrMM: 0.153,
      opportunityDayMM: 0.00042,
      processOppDayMM: 0.00026,
      assetOppDayMM: 0.00016,
      tmtPasses: [975, 980, 988, 992, 990, 984, 978, 972],
      sapMaintenance: {
        totalCostYrMM: 0.195,
        costPerDay: 534,
        reliabilityScore: "99.1%",
        creepDamageIndex: 0.22,
        failureRiskRating: "LOW",
        predictivePct: 75,
        reactivePct: 18,
        emergencyPct: 7,
        repairVsReplace: "82% Repair / 18% Replace",
        laborMix: "65% Westlake Employees / 25% Embedded / 10% Specialized",
        componentScope: {
          convection: "$0.058 MM (30%)",
          radiantCoils: "$0.097 MM (50%)",
          refractory: "$0.020 MM (10%)",
          burners: "$0.020 MM (10%)"
        },
        workOrdersCount: 12
      },
      prescriptions: {
        process: [
          "Optimal performance benchmark unit in Calvert fleet.",
          "Increase feed throughput by +2.0 MT/hr to absorb rebalanced load from CF-102."
        ],
        amh: [
          "First quartile maintenance cost baseline ($534/day). Maintain current PM schedule."
        ]
      }
    },
    {
      id: "CF-105",
      siteId: "calvert",
      siteName: "Calvert City",
      siteColor: "#FF6B00",
      name: "Furnace CF-105",
      sapId: "WLK-310105",
      designClass: "Technip GK6",
      manufacturer: "TechnipFMC",
      status: "ONLINE",
      runDays: 61,
      maxTargetRunDays: 90,
      thermalEfficiency: 92.9,
      specificEnergy: 13.5,
      ethyleneYield: 34.1,
      propyleneYield: 14.6,
      cokeThicknessMm: 2.4,
      deltaPressureBar: 0.35,
      coilAgeYears: 6.1,
      opportunityYrMM: 0.222,
      opportunityDayMM: 0.00061,
      processOppDayMM: 0.00037,
      assetOppDayMM: 0.00024,
      tmtPasses: [988, 995, 1002, 1008, 1004, 998, 990, 985],
      sapMaintenance: {
        totalCostYrMM: 0.260,
        costPerDay: 712,
        reliabilityScore: "96.4%",
        creepDamageIndex: 0.52,
        failureRiskRating: "MEDIUM",
        predictivePct: 60,
        reactivePct: 26,
        emergencyPct: 14,
        repairVsReplace: "70% Repair / 30% Replace",
        laborMix: "55% Westlake Employees / 30% Embedded / 15% Specialized",
        componentScope: {
          convection: "$0.078 MM (30%)",
          radiantCoils: "$0.117 MM (45%)",
          refractory: "$0.039 MM (15%)",
          burners: "$0.026 MM (10%)"
        },
        workOrdersCount: 16
      },
      prescriptions: {
        process: [
          "Draft profile stable; excess flue gas O2 at 2.1%.",
          "Maintain current operating envelope."
        ],
        amh: [
          "Monitor convection section draft damper linkage for backlash."
        ]
      }
    },
    {
      id: "CF-106",
      siteId: "calvert",
      siteName: "Calvert City",
      siteColor: "#FF6B00",
      name: "Furnace CF-106",
      sapId: "WLK-310106",
      designClass: "Technip GK6",
      manufacturer: "TechnipFMC",
      status: "ONLINE",
      runDays: 34,
      maxTargetRunDays: 90,
      thermalEfficiency: 93.2,
      specificEnergy: 13.3,
      ethyleneYield: 34.4,
      propyleneYield: 14.8,
      cokeThicknessMm: 1.5,
      deltaPressureBar: 0.25,
      coilAgeYears: 2.8,
      opportunityYrMM: 0.138,
      opportunityDayMM: 0.00038,
      processOppDayMM: 0.00023,
      assetOppDayMM: 0.00015,
      tmtPasses: [972, 978, 985, 990, 988, 982, 976, 970],
      sapMaintenance: {
        totalCostYrMM: 0.180,
        costPerDay: 493,
        reliabilityScore: "99.4%",
        creepDamageIndex: 0.18,
        failureRiskRating: "LOW",
        predictivePct: 78,
        reactivePct: 16,
        emergencyPct: 6,
        repairVsReplace: "85% Repair / 15% Replace",
        laborMix: "68% Westlake Employees / 22% Embedded / 10% Specialized",
        componentScope: {
          convection: "$0.054 MM (30%)",
          radiantCoils: "$0.090 MM (50%)",
          refractory: "$0.018 MM (10%)",
          burners: "$0.018 MM (10%)"
        },
        workOrdersCount: 10
      },
      prescriptions: {
        process: [
          "New coil installation performing at 1st quartile efficiency.",
          "Soft sensor severity control active."
        ],
        amh: [
          "Post-turnaround baseline audit verified zero leak points."
        ]
      }
    },

    // LACC ETHYLENE (8) - Color: #06B6D4
    {
      id: "LF-201",
      siteId: "lacc",
      siteName: "LACC Ethylene",
      siteColor: "#06B6D4",
      name: "Furnace LF-201",
      sapId: "WLK-310201",
      designClass: "Schmidt+Clemens SC-1",
      manufacturer: "Schmidt+Clemens GMBH",
      status: "ONLINE",
      runDays: 28,
      maxTargetRunDays: 100,
      thermalEfficiency: 93.9,
      specificEnergy: 13.0,
      ethyleneYield: 35.6,
      propyleneYield: 15.4,
      cokeThicknessMm: 1.2,
      deltaPressureBar: 0.22,
      coilAgeYears: 4.2,
      opportunityYrMM: 0.127,
      opportunityDayMM: 0.00035,
      processOppDayMM: 0.00022,
      assetOppDayMM: 0.00013,
      tmtPasses: [965, 972, 978, 984, 980, 974, 968, 962],
      sapMaintenance: {
        totalCostYrMM: 0.210,
        costPerDay: 575,
        reliabilityScore: "99.5%",
        creepDamageIndex: 0.28,
        failureRiskRating: "LOW",
        predictivePct: 80,
        reactivePct: 15,
        emergencyPct: 5,
        repairVsReplace: "88% Repair / 12% Replace",
        laborMix: "70% Westlake Employees / 20% Embedded / 10% Specialized",
        componentScope: {
          convection: "$0.063 MM (30%)",
          radiantCoils: "$0.105 MM (50%)",
          refractory: "$0.021 MM (10%)",
          burners: "$0.021 MM (10%)"
        },
        workOrdersCount: 11
      },
      prescriptions: {
        process: [
          "Top performing unit across Westlake enterprise fleet.",
          "Target candidate for load swing boost (+5% feed rate)."
        ],
        amh: [
          "Asset reliability score 99.5%. Baseline model for LACC fleet."
        ]
      }
    },
    {
      id: "LF-202",
      siteId: "lacc",
      siteName: "LACC Ethylene",
      siteColor: "#06B6D4",
      name: "Furnace LF-202",
      sapId: "WLK-310202",
      designClass: "Schmidt+Clemens SC-1",
      manufacturer: "Schmidt+Clemens GMBH",
      status: "ONLINE",
      runDays: 71,
      maxTargetRunDays: 100,
      thermalEfficiency: 92.8,
      specificEnergy: 13.5,
      ethyleneYield: 35.0,
      propyleneYield: 15.1,
      cokeThicknessMm: 3.1,
      deltaPressureBar: 0.40,
      coilAgeYears: 6.8,
      opportunityYrMM: 0.262,
      opportunityDayMM: 0.00072,
      processOppDayMM: 0.00044,
      assetOppDayMM: 0.00028,
      tmtPasses: [995, 1002, 1012, 1018, 1015, 1008, 1000, 992],
      sapMaintenance: {
        totalCostYrMM: 0.310,
        costPerDay: 849,
        reliabilityScore: "95.8%",
        creepDamageIndex: 0.58,
        failureRiskRating: "MEDIUM",
        predictivePct: 58,
        reactivePct: 27,
        emergencyPct: 15,
        repairVsReplace: "68% Repair / 32% Replace",
        laborMix: "52% Westlake Employees / 33% Embedded / 15% Specialized",
        componentScope: {
          convection: "$0.093 MM (30%)",
          radiantCoils: "$0.139 MM (45%)",
          refractory: "$0.046 MM (15%)",
          burners: "$0.032 MM (10%)"
        },
        workOrdersCount: 19
      },
      prescriptions: {
        process: [
          "Coking rate within normal boundaries.",
          "Rebalance firebox draft; burner 6 operating slightly rich."
        ],
        amh: [
          "Schedule preventive burner tip cleaning during upcoming decoke."
        ]
      }
    },
    {
      id: "LF-203",
      siteId: "lacc",
      siteName: "LACC Ethylene",
      siteColor: "#06B6D4",
      name: "Furnace LF-203",
      sapId: "WLK-310203",
      designClass: "Schmidt+Clemens SC-1",
      manufacturer: "Schmidt+Clemens GMBH",
      status: "ONLINE",
      runDays: 82,
      maxTargetRunDays: 95,
      thermalEfficiency: 92.2,
      specificEnergy: 13.9,
      ethyleneYield: 34.4,
      propyleneYield: 14.7,
      cokeThicknessMm: 3.8,
      deltaPressureBar: 0.48,
      coilAgeYears: 7.9,
      opportunityYrMM: 0.357,
      opportunityDayMM: 0.00098,
      processOppDayMM: 0.00060,
      assetOppDayMM: 0.00038,
      tmtPasses: [1008, 1015, 1028, 1035, 1030, 1022, 1012, 1004],
      sapMaintenance: {
        totalCostYrMM: 0.390,
        costPerDay: 1068,
        reliabilityScore: "91.8%",
        creepDamageIndex: 0.82,
        failureRiskRating: "HIGH",
        predictivePct: 50,
        reactivePct: 32,
        emergencyPct: 18,
        repairVsReplace: "60% Repair / 40% Replace",
        laborMix: "45% Westlake Employees / 35% Embedded / 20% Specialized",
        componentScope: {
          convection: "$0.097 MM (25%)",
          radiantCoils: "$0.214 MM (55%)",
          refractory: "$0.039 MM (10%)",
          burners: "$0.040 MM (10%)"
        },
        workOrdersCount: 24
      },
      prescriptions: {
        process: [
          "High coil age (7.9 yrs). Monitor creep strain during end-of-run temperature spikes.",
          "Prepare decoke schedule for next week."
        ],
        amh: [
          "HIGH CREEP DAMAGE (0.82). Radiant coil replacement required at next turnaround."
        ]
      }
    },
    {
      id: "LF-204",
      siteId: "lacc",
      siteName: "LACC Ethylene",
      siteColor: "#06B6D4",
      name: "Furnace LF-204",
      sapId: "WLK-310204",
      designClass: "KBR SCORE SC-1",
      manufacturer: "KBR / Kellogg",
      status: "ONLINE",
      runDays: 54,
      maxTargetRunDays: 100,
      thermalEfficiency: 93.1,
      specificEnergy: 13.3,
      ethyleneYield: 35.3,
      propyleneYield: 15.3,
      cokeThicknessMm: 2.2,
      deltaPressureBar: 0.31,
      coilAgeYears: 4.8,
      opportunityYrMM: 0.197,
      opportunityDayMM: 0.00054,
      processOppDayMM: 0.00033,
      assetOppDayMM: 0.00021,
      tmtPasses: [980, 986, 995, 1002, 998, 992, 984, 978],
      sapMaintenance: {
        totalCostYrMM: 0.240,
        costPerDay: 657,
        reliabilityScore: "97.6%",
        creepDamageIndex: 0.35,
        failureRiskRating: "LOW",
        predictivePct: 68,
        reactivePct: 22,
        emergencyPct: 10,
        repairVsReplace: "76% Repair / 24% Replace",
        laborMix: "60% Westlake Employees / 28% Embedded / 12% Specialized",
        componentScope: {
          convection: "$0.072 MM (30%)",
          radiantCoils: "$0.108 MM (45%)",
          refractory: "$0.036 MM (15%)",
          burners: "$0.024 MM (10%)"
        },
        workOrdersCount: 14
      },
      prescriptions: {
        process: [
          "Excellent severe kinetic severity alignment.",
          "Soft sensor yield prediction tracking within 0.12% margin of lab sample."
        ],
        amh: [
          "Maintain current predictive maintenance classification rules."
        ]
      }
    },
    {
      id: "LF-205",
      siteId: "lacc",
      siteName: "LACC Ethylene",
      siteColor: "#06B6D4",
      name: "Furnace LF-205",
      sapId: "WLK-310205",
      designClass: "KBR SCORE SC-1",
      manufacturer: "KBR / Kellogg",
      status: "DECOKING",
      runDays: 0,
      maxTargetRunDays: 95,
      thermalEfficiency: 88.0,
      specificEnergy: 15.3,
      ethyleneYield: 30.5,
      propyleneYield: 12.9,
      cokeThicknessMm: 5.1,
      deltaPressureBar: 0.65,
      coilAgeYears: 6.2,
      opportunityYrMM: 0.383,
      opportunityDayMM: 0.00105,
      processOppDayMM: 0.00064,
      assetOppDayMM: 0.00041,
      tmtPasses: [810, 825, 838, 842, 835, 828, 818, 808],
      sapMaintenance: {
        totalCostYrMM: 0.370,
        costPerDay: 1013,
        reliabilityScore: "93.0%",
        creepDamageIndex: 0.64,
        failureRiskRating: "MEDIUM",
        predictivePct: 52,
        reactivePct: 30,
        emergencyPct: 18,
        repairVsReplace: "62% Repair / 38% Replace",
        laborMix: "48% Westlake Employees / 34% Embedded / 18% Specialized",
        componentScope: {
          convection: "$0.092 MM (25%)",
          radiantCoils: "$0.185 MM (50%)",
          refractory: "$0.055 MM (15%)",
          burners: "$0.038 MM (10%)"
        },
        workOrdersCount: 23
      },
      prescriptions: {
        process: [
          "Decoke in progress. Steam-air kinetics showing rapid spalling.",
          "Estimated online restart in 14 hours."
        ],
        amh: [
          "Inspect convection section expansion joints during current decoke outage."
        ]
      }
    },
    {
      id: "LF-206",
      siteId: "lacc",
      siteName: "LACC Ethylene",
      siteColor: "#06B6D4",
      name: "Furnace LF-206",
      sapId: "WLK-310206",
      designClass: "KBR SCORE SC-1",
      manufacturer: "KBR / Kellogg",
      status: "ONLINE",
      runDays: 48,
      maxTargetRunDays: 100,
      thermalEfficiency: 93.3,
      specificEnergy: 13.2,
      ethyleneYield: 35.4,
      propyleneYield: 15.3,
      cokeThicknessMm: 1.9,
      deltaPressureBar: 0.29,
      coilAgeYears: 6.8,
      opportunityYrMM: 0.178,
      opportunityDayMM: 0.00049,
      processOppDayMM: 0.00030,
      assetOppDayMM: 0.00019,
      tmtPasses: [976, 982, 990, 996, 992, 986, 980, 974],
      sapMaintenance: {
        totalCostYrMM: 0.230,
        costPerDay: 630,
        reliabilityScore: "98.0%",
        creepDamageIndex: 0.42,
        failureRiskRating: "LOW-MEDIUM",
        predictivePct: 70,
        reactivePct: 20,
        emergencyPct: 10,
        repairVsReplace: "78% Repair / 22% Replace",
        laborMix: "62% Westlake Employees / 26% Embedded / 12% Specialized",
        componentScope: {
          convection: "$0.069 MM (30%)",
          radiantCoils: "$0.103 MM (45%)",
          refractory: "$0.035 MM (15%)",
          burners: "$0.023 MM (10%)"
        },
        workOrdersCount: 13
      },
      prescriptions: {
        process: [
          "Operating parameters optimal."
        ],
        amh: [
          "RETUBE DEFERRAL: Creep life consumption low (0.42). Defer major retube by 14 months ($0.325 MM savings)."
        ]
      }
    },
    {
      id: "LF-207",
      siteId: "lacc",
      siteName: "LACC Ethylene",
      siteColor: "#06B6D4",
      name: "Furnace LF-207",
      sapId: "WLK-310207",
      designClass: "Shaw Stone & Webster",
      manufacturer: "Shaw Stone & Webster",
      status: "ONLINE",
      runDays: 66,
      maxTargetRunDays: 95,
      thermalEfficiency: 92.7,
      specificEnergy: 13.6,
      ethyleneYield: 34.9,
      propyleneYield: 15.0,
      cokeThicknessMm: 2.9,
      deltaPressureBar: 0.37,
      coilAgeYears: 5.7,
      opportunityYrMM: 0.248,
      opportunityDayMM: 0.00068,
      processOppDayMM: 0.00041,
      assetOppDayMM: 0.00027,
      tmtPasses: [990, 998, 1008, 1014, 1010, 1002, 994, 988],
      sapMaintenance: {
        totalCostYrMM: 0.280,
        costPerDay: 767,
        reliabilityScore: "96.2%",
        creepDamageIndex: 0.48,
        failureRiskRating: "MEDIUM",
        predictivePct: 62,
        reactivePct: 25,
        emergencyPct: 13,
        repairVsReplace: "72% Repair / 28% Replace",
        laborMix: "55% Westlake Employees / 30% Embedded / 15% Specialized",
        componentScope: {
          convection: "$0.084 MM (30%)",
          radiantCoils: "$0.126 MM (45%)",
          refractory: "$0.042 MM (15%)",
          burners: "$0.028 MM (10%)"
        },
        workOrdersCount: 17
      },
      prescriptions: {
        process: [
          "Convection section cleanliness at 91%. Wash scheduled during upcoming outage."
        ],
        amh: [
          "Recalibrate draft sensor transmitters."
        ]
      }
    },
    {
      id: "LF-208",
      siteId: "lacc",
      siteName: "LACC Ethylene",
      siteColor: "#06B6D4",
      name: "Furnace LF-208",
      sapId: "WLK-310208",
      designClass: "Shaw Stone & Webster",
      manufacturer: "Shaw Stone & Webster",
      status: "ONLINE",
      runDays: 19,
      maxTargetRunDays: 100,
      thermalEfficiency: 94.1,
      specificEnergy: 12.9,
      ethyleneYield: 35.8,
      propyleneYield: 15.5,
      cokeThicknessMm: 0.8,
      deltaPressureBar: 0.19,
      coilAgeYears: 1.5,
      opportunityYrMM: 0.102,
      opportunityDayMM: 0.00028,
      processOppDayMM: 0.00017,
      assetOppDayMM: 0.00011,
      tmtPasses: [958, 964, 970, 975, 972, 966, 960, 954],
      sapMaintenance: {
        totalCostYrMM: 0.150,
        costPerDay: 410,
        reliabilityScore: "99.8%",
        creepDamageIndex: 0.10,
        failureRiskRating: "LOW",
        predictivePct: 85,
        reactivePct: 11,
        emergencyPct: 4,
        repairVsReplace: "90% Repair / 10% Replace",
        laborMix: "75% Westlake Employees / 18% Embedded / 7% Specialized",
        componentScope: {
          convection: "$0.045 MM (30%)",
          radiantCoils: "$0.075 MM (50%)",
          refractory: "$0.015 MM (10%)",
          burners: "$0.015 MM (10%)"
        },
        workOrdersCount: 8
      },
      prescriptions: {
        process: [
          "New asset commissioning complete. Operating at peak benchmark baseline."
        ],
        amh: [
          "Benchmark unit ($410/day cost). Lowest maintenance intensity."
        ]
      }
    },

    // PETRO 1 OLEFINS (6) - Color: #10B981
    {
      id: "P1-F01",
      siteId: "petro1",
      siteName: "Petro 1 Olefins",
      siteColor: "#10B981",
      name: "Furnace P1-F01",
      sapId: "WLK-310301",
      designClass: "Kinetics Tech (KTI)",
      manufacturer: "Kinetics Technology Int",
      status: "ONLINE",
      runDays: 31,
      maxTargetRunDays: 90,
      thermalEfficiency: 93.0,
      specificEnergy: 13.4,
      ethyleneYield: 34.3,
      propyleneYield: 14.7,
      cokeThicknessMm: 1.4,
      deltaPressureBar: 0.24,
      coilAgeYears: 3.1,
      opportunityYrMM: 0.150,
      opportunityDayMM: 0.00041,
      processOppDayMM: 0.00025,
      assetOppDayMM: 0.00016,
      tmtPasses: [970, 976, 984, 990, 986, 980, 974, 968],
      sapMaintenance: {
        totalCostYrMM: 0.205,
        costPerDay: 561,
        reliabilityScore: "98.6%",
        creepDamageIndex: 0.24,
        failureRiskRating: "LOW",
        predictivePct: 72,
        reactivePct: 20,
        emergencyPct: 8,
        repairVsReplace: "80% Repair / 20% Replace",
        laborMix: "64% Westlake Employees / 26% Embedded / 10% Specialized",
        componentScope: {
          convection: "$0.061 MM (30%)",
          radiantCoils: "$0.102 MM (50%)",
          refractory: "$0.021 MM (10%)",
          burners: "$0.021 MM (10%)"
        },
        workOrdersCount: 13
      },
      prescriptions: {
        process: [
          "Clean unit in Petro 1 fleet.",
          "Candidate for +3% load swing."
        ],
        amh: [
          "Predictive maintenance compliance at 72%."
        ]
      }
    },
    {
      id: "P1-F02",
      siteId: "petro1",
      siteName: "Petro 1 Olefins",
      siteColor: "#10B981",
      name: "Furnace P1-F02",
      sapId: "WLK-310302",
      designClass: "Kinetics Tech (KTI)",
      manufacturer: "Kinetics Technology Int",
      status: "ONLINE",
      runDays: 76,
      maxTargetRunDays: 90,
      thermalEfficiency: 92.1,
      specificEnergy: 14.0,
      ethyleneYield: 33.7,
      propyleneYield: 14.3,
      cokeThicknessMm: 3.6,
      deltaPressureBar: 0.46,
      coilAgeYears: 3.6,
      opportunityYrMM: 0.325,
      opportunityDayMM: 0.00089,
      processOppDayMM: 0.00054,
      assetOppDayMM: 0.00035,
      tmtPasses: [1002, 1010, 1024, 1032, 1028, 1018, 1008, 998],
      sapMaintenance: {
        totalCostYrMM: 0.340,
        costPerDay: 931,
        reliabilityScore: "94.2%",
        creepDamageIndex: 0.38,
        failureRiskRating: "MEDIUM",
        predictivePct: 52,
        reactivePct: 31,
        emergencyPct: 17,
        repairVsReplace: "64% Repair / 36% Replace",
        laborMix: "48% Westlake Employees / 34% Embedded / 18% Specialized",
        componentScope: {
          convection: "$0.085 MM (25%)",
          radiantCoils: "$0.170 MM (50%)",
          refractory: "$0.051 MM (15%)",
          burners: "$0.034 MM (10%)"
        },
        workOrdersCount: 21
      },
      prescriptions: {
        process: [
          "Elevated coking rate."
        ],
        amh: [
          "Unassigned SAP work orders detected. Apply Module 2 automated classifier to isolate repeat burner tile repairs."
        ]
      }
    },
    {
      id: "P1-F03",
      siteId: "petro1",
      siteName: "Petro 1 Olefins",
      siteColor: "#10B981",
      name: "Furnace P1-F03",
      sapId: "WLK-310303",
      designClass: "Kinetics Tech (KTI)",
      manufacturer: "Kinetics Technology Int",
      status: "ONLINE",
      runDays: 84,
      maxTargetRunDays: 90,
      thermalEfficiency: 91.5,
      specificEnergy: 14.4,
      ethyleneYield: 33.1,
      propyleneYield: 14.0,
      cokeThicknessMm: 4.3,
      deltaPressureBar: 0.54,
      coilAgeYears: 3.4,
      opportunityYrMM: 0.456,
      opportunityDayMM: 0.00125,
      processOppDayMM: 0.00075,
      assetOppDayMM: 0.00050,
      tmtPasses: [1018, 1026, 1038, 1045, 1040, 1028, 1016, 1006],
      sapMaintenance: {
        totalCostYrMM: 0.460,
        costPerDay: 1260,
        reliabilityScore: "89.5%",
        creepDamageIndex: 0.44,
        failureRiskRating: "MEDIUM-HIGH",
        predictivePct: 42,
        reactivePct: 36,
        emergencyPct: 22,
        repairVsReplace: "55% Repair / 45% Replace",
        laborMix: "38% Westlake Employees / 38% Embedded / 24% Specialized",
        componentScope: {
          convection: "$0.115 MM (25%)",
          radiantCoils: "$0.230 MM (50%)",
          refractory: "$0.069 MM (15%)",
          burners: "$0.046 MM (10%)"
        },
        workOrdersCount: 28
      },
      prescriptions: {
        process: [
          "CRITICAL ALERT: Pass 4 TMT at 1045°C. Burner #4 flame impingement detected.",
          "Trim Pass 4 fuel valve by -3.5% immediately. Schedule decoke within 48 hours."
        ],
        amh: [
          "HIGH EMERGENCY SPEND (22%). Deploy Module 2 SAP work order classifier to eliminate reactive callouts."
        ]
      }
    },
    {
      id: "P1-F04",
      siteId: "petro1",
      siteName: "Petro 1 Olefins",
      siteColor: "#10B981",
      name: "Furnace P1-F04",
      sapId: "WLK-310304",
      designClass: "Kinetics Tech (KTI)",
      manufacturer: "Kinetics Technology Int",
      status: "ONLINE",
      runDays: 45,
      maxTargetRunDays: 90,
      thermalEfficiency: 92.8,
      specificEnergy: 13.6,
      ethyleneYield: 34.0,
      propyleneYield: 14.5,
      cokeThicknessMm: 2.1,
      deltaPressureBar: 0.30,
      coilAgeYears: 2.9,
      opportunityYrMM: 0.190,
      opportunityDayMM: 0.00052,
      processOppDayMM: 0.00032,
      assetOppDayMM: 0.00020,
      tmtPasses: [978, 984, 992, 998, 994, 988, 982, 976],
      sapMaintenance: {
        totalCostYrMM: 0.225,
        costPerDay: 616,
        reliabilityScore: "97.8%",
        creepDamageIndex: 0.20,
        failureRiskRating: "LOW",
        predictivePct: 68,
        reactivePct: 22,
        emergencyPct: 10,
        repairVsReplace: "76% Repair / 24% Replace",
        laborMix: "58% Westlake Employees / 30% Embedded / 12% Specialized",
        componentScope: {
          convection: "$0.067 MM (30%)",
          radiantCoils: "$0.101 MM (45%)",
          refractory: "$0.034 MM (15%)",
          burners: "$0.023 MM (10%)"
        },
        workOrdersCount: 14
      },
      prescriptions: {
        process: [
          "Stable operation. Soft sensor ethylene yield estimation active."
        ],
        amh: [
          "Maintain current PM plan."
        ]
      }
    },
    {
      id: "P1-F05",
      siteId: "petro1",
      siteName: "Petro 1 Olefins",
      siteColor: "#10B981",
      name: "Furnace P1-F05",
      sapId: "WLK-310305",
      designClass: "Kinetics Tech (KTI)",
      manufacturer: "Kinetics Technology Int",
      status: "ONLINE",
      runDays: 58,
      maxTargetRunDays: 90,
      thermalEfficiency: 92.4,
      specificEnergy: 13.8,
      ethyleneYield: 33.8,
      propyleneYield: 14.4,
      cokeThicknessMm: 2.7,
      deltaPressureBar: 0.36,
      coilAgeYears: 3.3,
      opportunityYrMM: 0.233,
      opportunityDayMM: 0.00064,
      processOppDayMM: 0.00039,
      assetOppDayMM: 0.00025,
      tmtPasses: [985, 992, 1002, 1008, 1005, 998, 990, 984],
      sapMaintenance: {
        totalCostYrMM: 0.270,
        costPerDay: 739,
        reliabilityScore: "96.0%",
        creepDamageIndex: 0.28,
        failureRiskRating: "LOW-MEDIUM",
        predictivePct: 60,
        reactivePct: 26,
        emergencyPct: 14,
        repairVsReplace: "70% Repair / 30% Replace",
        laborMix: "52% Westlake Employees / 32% Embedded / 16% Specialized",
        componentScope: {
          convection: "$0.081 MM (30%)",
          radiantCoils: "$0.121 MM (45%)",
          refractory: "$0.040 MM (15%)",
          burners: "$0.027 MM (10%)"
        },
        workOrdersCount: 17
      },
      prescriptions: {
        process: [
          "Firebox draft profile balanced. Flue gas O2 at 2.3%."
        ],
        amh: [
          "Draft actuator calibration verified."
        ]
      }
    },
    {
      id: "P1-F06",
      siteId: "petro1",
      siteName: "Petro 1 Olefins",
      siteColor: "#10B981",
      name: "Furnace P1-F06",
      sapId: "WLK-310306",
      designClass: "Kinetics Tech (KTI)",
      manufacturer: "Kinetics Technology Int",
      status: "ONLINE",
      runDays: 22,
      maxTargetRunDays: 90,
      thermalEfficiency: 93.3,
      specificEnergy: 13.2,
      ethyleneYield: 34.6,
      propyleneYield: 14.9,
      cokeThicknessMm: 1.0,
      deltaPressureBar: 0.20,
      coilAgeYears: 2.5,
      opportunityYrMM: 0.117,
      opportunityDayMM: 0.00032,
      processOppDayMM: 0.00019,
      assetOppDayMM: 0.00013,
      tmtPasses: [962, 968, 975, 980, 978, 972, 966, 960],
      sapMaintenance: {
        totalCostYrMM: 0.170,
        costPerDay: 465,
        reliabilityScore: "99.2%",
        creepDamageIndex: 0.15,
        failureRiskRating: "LOW",
        predictivePct: 80,
        reactivePct: 14,
        emergencyPct: 6,
        repairVsReplace: "86% Repair / 14% Replace",
        laborMix: "68% Westlake Employees / 22% Embedded / 10% Specialized",
        componentScope: {
          convection: "$0.051 MM (30%)",
          radiantCoils: "$0.085 MM (50%)",
          refractory: "$0.017 MM (10%)",
          burners: "$0.017 MM (10%)"
        },
        workOrdersCount: 9
      },
      prescriptions: {
        process: [
          "1st quartile performance in Petro 1 fleet."
        ],
        amh: [
          "Low cost baseline ($465/day)."
        ]
      }
    },

    // PETRO 2 OLEFINS (4) - Color: #8B5CF6
    {
      id: "P2-F01",
      siteId: "petro2",
      siteName: "Petro 2 Olefins",
      siteColor: "#8B5CF6",
      name: "Furnace P2-F01",
      sapId: "WLK-310401",
      designClass: "Babcock Hitachi Gradiation",
      manufacturer: "Babcock Hitachi / Belleli",
      status: "ONLINE",
      runDays: 68,
      maxTargetRunDays: 85,
      thermalEfficiency: 92.0,
      specificEnergy: 14.1,
      ethyleneYield: 33.4,
      propyleneYield: 14.2,
      cokeThicknessMm: 3.2,
      deltaPressureBar: 0.42,
      coilAgeYears: 5.5,
      opportunityYrMM: 0.288,
      opportunityDayMM: 0.00079,
      processOppDayMM: 0.00043,
      assetOppDayMM: 0.00036,
      tmtPasses: [998, 1006, 1018, 1025, 1020, 1012, 1004, 996],
      sapMaintenance: {
        totalCostYrMM: 0.330,
        costPerDay: 904,
        reliabilityScore: "94.5%",
        creepDamageIndex: 0.50,
        failureRiskRating: "MEDIUM",
        predictivePct: 54,
        reactivePct: 28,
        emergencyPct: 18,
        repairVsReplace: "62% Repair / 38% Replace",
        laborMix: "46% Westlake Employees / 34% Embedded / 20% Specialized",
        componentScope: {
          convection: "$0.082 MM (25%)",
          radiantCoils: "$0.165 MM (50%)",
          refractory: "$0.049 MM (15%)",
          burners: "$0.034 MM (10%)"
        },
        workOrdersCount: 20
      },
      prescriptions: {
        process: [
          "Target run length of 85 days achievable with soft sensor closed-loop control.",
          "Adjust SHC ratio to 0.46 to lower radiant wall thermal load."
        ],
        amh: [
          "Inspect convection tube skin thermocouples during next outage."
        ]
      }
    },
    {
      id: "P2-F02",
      siteId: "petro2",
      siteName: "Petro 2 Olefins",
      siteColor: "#8B5CF6",
      name: "Furnace P2-F02",
      sapId: "WLK-310402",
      designClass: "Babcock Hitachi Gradiation",
      manufacturer: "Babcock Hitachi / Belleli",
      status: "ONLINE",
      runDays: 74,
      maxTargetRunDays: 85,
      thermalEfficiency: 91.6,
      specificEnergy: 14.3,
      ethyleneYield: 33.0,
      propyleneYield: 13.9,
      cokeThicknessMm: 3.7,
      deltaPressureBar: 0.47,
      coilAgeYears: 5.8,
      opportunityYrMM: 0.321,
      opportunityDayMM: 0.00088,
      processOppDayMM: 0.00048,
      assetOppDayMM: 0.00040,
      tmtPasses: [1005, 1014, 1026, 1034, 1030, 1020, 1010, 1002],
      sapMaintenance: {
        totalCostYrMM: 0.360,
        costPerDay: 986,
        reliabilityScore: "93.4%",
        creepDamageIndex: 0.56,
        failureRiskRating: "MEDIUM",
        predictivePct: 48,
        reactivePct: 32,
        emergencyPct: 20,
        repairVsReplace: "58% Repair / 42% Replace",
        laborMix: "42% Westlake Employees / 36% Embedded / 22% Specialized",
        componentScope: {
          convection: "$0.090 MM (25%)",
          radiantCoils: "$0.180 MM (50%)",
          refractory: "$0.054 MM (15%)",
          burners: "$0.036 MM (10%)"
        },
        workOrdersCount: 23
      },
      prescriptions: {
        process: [
          "Plan decoke in 6 days. Prepare steam decoke header connection."
        ],
        amh: [
          "Refractory module insulation degradation detected. Prepare ceramic fibre patching."
        ]
      }
    },
    {
      id: "P2-F03",
      siteId: "petro2",
      siteName: "Petro 2 Olefins",
      siteColor: "#8B5CF6",
      name: "Furnace P2-F03",
      sapId: "WLK-310403",
      designClass: "Babcock Hitachi Gradiation",
      manufacturer: "Babcock Hitachi / Belleli",
      status: "ONLINE",
      runDays: 79,
      maxTargetRunDays: 85,
      thermalEfficiency: 91.2,
      specificEnergy: 14.6,
      ethyleneYield: 32.7,
      propyleneYield: 13.7,
      cokeThicknessMm: 4.2,
      deltaPressureBar: 0.51,
      coilAgeYears: 6.2,
      opportunityYrMM: 0.357,
      opportunityDayMM: 0.00098,
      processOppDayMM: 0.00054,
      assetOppDayMM: 0.00044,
      tmtPasses: [1012, 1020, 1032, 1040, 1035, 1025, 1015, 1006],
      sapMaintenance: {
        totalCostYrMM: 0.410,
        costPerDay: 1123,
        reliabilityScore: "90.8%",
        creepDamageIndex: 0.68,
        failureRiskRating: "HIGH",
        predictivePct: 44,
        reactivePct: 34,
        emergencyPct: 22,
        repairVsReplace: "52% Repair / 48% Replace",
        laborMix: "38% Westlake Employees / 38% Embedded / 24% Specialized",
        componentScope: {
          convection: "$0.102 MM (25%)",
          radiantCoils: "$0.225 MM (55%)",
          refractory: "$0.041 MM (10%)",
          burners: "$0.042 MM (10%)"
        },
        workOrdersCount: 25
      },
      prescriptions: {
        process: [
          "Lowest thermal efficiency furnace in Petro 2.",
          "Rebalance 4.5% feed load to clean LACC furnace LF-201 ($0.00185 MM/day total opportunity)."
        ],
        amh: [
          "High maintenance intensity ($1,123/day). Reallocate contractor labor mix to lower costs."
        ]
      }
    },
    {
      id: "P2-F04",
      siteId: "petro2",
      siteName: "Petro 2 Olefins",
      siteColor: "#8B5CF6",
      name: "Furnace P2-F04",
      sapId: "WLK-310404",
      designClass: "Babcock Hitachi Gradiation",
      manufacturer: "Babcock Hitachi / Belleli",
      status: "ONLINE",
      runDays: 38,
      maxTargetRunDays: 85,
      thermalEfficiency: 92.7,
      specificEnergy: 13.7,
      ethyleneYield: 33.9,
      propyleneYield: 14.5,
      cokeThicknessMm: 1.8,
      deltaPressureBar: 0.27,
      coilAgeYears: 4.1,
      opportunityYrMM: 0.168,
      opportunityDayMM: 0.00046,
      processOppDayMM: 0.00026,
      assetOppDayMM: 0.00020,
      tmtPasses: [975, 982, 990, 996, 992, 986, 980, 974],
      sapMaintenance: {
        totalCostYrMM: 0.215,
        costPerDay: 589,
        reliabilityScore: "97.5%",
        creepDamageIndex: 0.32,
        failureRiskRating: "LOW",
        predictivePct: 70,
        reactivePct: 21,
        emergencyPct: 9,
        repairVsReplace: "78% Repair / 22% Replace",
        laborMix: "60% Westlake Employees / 28% Embedded / 12% Specialized",
        componentScope: {
          convection: "$0.064 MM (30%)",
          radiantCoils: "$0.097 MM (45%)",
          refractory: "$0.032 MM (15%)",
          burners: "$0.022 MM (10%)"
        },
        workOrdersCount: 13
      },
      prescriptions: {
        process: [
          "Normal operation. Burner draft simulation balanced."
        ],
        amh: [
          "Normal maintenance metrics."
        ]
      }
    }
  ],

  // SAP Work Orders Sample Log (100% Westlake Branded)
  workOrders: [
    {
      id: "WO-90214",
      furnaceId: "P1-F03",
      siteId: "petro1",
      siteColor: "#10B981",
      date: "2026-06-14",
      category: "EMERGENCY",
      type: "REPAIR",
      component: "Radiant Coils / Pass 4",
      costMM: 0.0485,
      costUSD: "$48,500",
      laborMix: "Specialized Contractor (80%), Westlake (20%)",
      description: "Emergency hot-spot thermocouple clamp replacement and local ceramic insulation patch."
    },
    {
      id: "WO-90188",
      furnaceId: "CF-102",
      siteId: "calvert",
      siteColor: "#FF6B00",
      date: "2026-06-02",
      category: "REACTIVE",
      type: "REPAIR",
      component: "Burner Tiles",
      costMM: 0.0224,
      costUSD: "$22,400",
      laborMix: "Embedded Contractor (65%), Westlake (35%)",
      description: "Replaced cracked burner wall tile #4 following localized draft pressure spike."
    },
    {
      id: "WO-90142",
      furnaceId: "LF-201",
      siteId: "lacc",
      siteColor: "#06B6D4",
      date: "2026-05-18",
      category: "PREDICTIVE",
      type: "REPAIR",
      component: "Convection Section",
      costMM: 0.0142,
      costUSD: "$14,200",
      laborMix: "Westlake Employees (85%), Embedded (15%)",
      description: "Scheduled online sootblowing and skin temperature calibration."
    },
    {
      id: "WO-90095",
      furnaceId: "LF-205",
      siteId: "lacc",
      siteColor: "#06B6D4",
      date: "2026-04-29",
      category: "PREDICTIVE",
      type: "REPLACEMENT",
      component: "Refractory Lining",
      costMM: 0.0650,
      costUSD: "$65,000",
      laborMix: "Embedded Contractor (70%), Westlake (30%)",
      description: "Targeted refractory module replacement during planned decoke window."
    },
    {
      id: "WO-90031",
      furnaceId: "P2-F03",
      siteId: "petro2",
      siteColor: "#8B5CF6",
      date: "2026-04-10",
      category: "REACTIVE",
      type: "REPAIR",
      component: "Draft Damper Actuator",
      costMM: 0.0189,
      costUSD: "$18,900",
      laborMix: "Specialized Contractor (60%), Westlake (40%)",
      description: "Repaired binding flue gas damper positioner linkage."
    }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = WESTLAKE_DATA;
}
