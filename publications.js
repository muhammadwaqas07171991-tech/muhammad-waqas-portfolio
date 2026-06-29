const publicationFolder = "publications";

const publicationFiles = [
  { year: "2022", type: "pdf", title: "On-Farm Composting of Agricultural Waste Materials for Sustainable Agriculture in Pakistan", file: "2022. On-Farm Composting of Agricultural Waste Materials forSustainable Agriculture in Pakistan.pdf" },
  { year: "2022", type: "pdf", title: "Runoff Estimation Using Advanced Soft Computing Techniques: A Case Study of Mangla Watershed, Pakistan", file: "2022. Runoff Estimation Using Advanced Soft Computing Techniques A Case Study of Mangla Watershed Pakistan.pdf" },
  { year: "2023", type: "pdf", title: "Composting Processes for Agricultural Waste Management: A Comprehensive Review", file: "2023 Composting Processes for Agricultural Waste Management A Comprehensive Review.pdf" },
  { year: "2023", type: "pdf", title: "Land Use and Land Cover Prediction with QGIS-based Machine Learning Algorithms", file: "2023 Conference_paper_2_Land Use and Land Cover Prediction with QGIS-based Machine Learning Algorithms A Case Study of Tha Chin River Basin, Thailand.pdf" },
  { year: "2023", type: "pdf", title: "Temperature prediction by gene expression programming", file: "2023 Conference_paper_3_Temperature prediction by gene expression programming.pdf" },
  { year: "2023", type: "pdf", title: "Assessment of Advanced Artificial Intelligence Techniques for Flood Forecasting", file: "2023 Conference_paper_4_Assessment of Advanced Artificial Intelligence Techniques for Flood Forecasting.pdf" },
  { year: "2023", type: "pdf", title: "Monitoring Land Use/Land Cover Change in Tha Chin River Basin", file: "2023 Conference_paper_5_Monitoring Land UseLand Cover Change in Tha Chin River Basin.pdf" },
  { year: "2023", type: "pdf", title: "Imputation of missing daily rainfall data: AI and statistical techniques", file: "2023 Imputation of missing daily rainfall data; A comparison between artificial intelligence and statistical techniques.pdf" },
  { year: "2023", type: "pdf", title: "AI-Based Techniques for Rainfall Forecasting in Thailand", file: "2023 Potential of Artificial Intelligence-Based Techniques for Rainfall Forecasting in Thailand A Comprehensive Review.pdf" },
  { year: "2024", type: "pdf", title: "A critical review of RNN and LSTM variants in hydrological time series predictions", file: "2024 A critical review of RNN and LSTM variants in hydrological time series predictions.pdf" },
  { year: "2024", type: "pdf", title: "Assessment of CMIP6 GCMs for precipitation projections in Southern Thailand", file: "2024 Assessment of CMIP6 GCMs for selecting a suitable climate model for precipitation projections in Southern Thailand.pdf" },
  { year: "2024", type: "pdf", title: "Assessment of Rainfall Data Imputation Techniques", file: "2024 Book Chapter_2_Assessment of Rainfall Data Imputation Techniques A Comparative Study with Focus on Thai Rainfall Dataset.pdf" },
  { year: "2024", type: "pdf", title: "Crop water requirements and potential evapotranspiration for sustainable coffee farming", file: "2024 Determination of crop water requirements and potential evapotranspiration for sustainable coffee farming in response to future climate change scenarios.pdf" },
  { year: "2024", type: "pdf", title: "Adaptive mesh generation for geophysical models over the Gulf of Thailand", file: "2024 Efficient and consistent adaptive mesh generation for geophysical models A case study over the Gulf of Thailand.pdf" },
  { year: "2024", type: "pdf", title: "Novel input variable selection in the water basins of Thailand", file: "2024 Incorporating novel input variable selection method for in the different water basins of Thailand.pdf" },
  { year: "2024", type: "pdf", title: "Influence of El Nino Southern Oscillation on precipitation variability", file: "2024 Influence of El Niño southern oscillation on precipitation variability in Northeast Thailand.pdf" },
  { year: "2024", type: "png", title: "Remediation of chromium contaminated water and soil by doped biochars", file: "2024 Remediation of chromium contaminated water and soil by nitrogen and iron doped biochars.png" },
  { year: "2024", type: "pdf", title: "Seasonal WaveNet-LSTM", file: "2024 Seasonal WaveNetLSTM.pdf" },
  { year: "2024", type: "pdf", title: "Time series trend analysis and forecasting of climate variability in Thailand", file: "2024 Time series trend analysis and forecasting of climate variability using deep learning in Thailand.pdf" },
  { year: "2024", type: "pdf", title: "Meteorological drought prediction in the Mun River Basin, Thailand", file: "2024. A deep learning perspective on meteorological droughts prediction in the Mun River Basin, Thailand.pdf" },
  { year: "2024", type: "pdf", title: "Advancements in daily precipitation forecasting in the tropical climate of Thailand", file: "2024. Advancements in daily precipitation forecasting A deep dive into daily precipitation forecasting hybrid methods in the Tropical Climate of Thailand.pdf" },
  { year: "2024", type: "pdf", title: "Hydrological model parameter regionalization in the Tha Chin River Basin", file: "2024. Hydrological model parameter regionalization Runoff estimation using machine learning techniques in the Tha Chin River Basin Thailand.pdf" },
  { year: "2025", type: "pdf", title: "Advances in AI to model the impact of El Nino", file: "2025 Advances in artificial intelligence to model the impact of El.pdf" },
  { year: "2025", type: "pdf", title: "Advances in atmospheric, oceanic, and coupled models for meteorological forecasting", file: "2025 Advances in atmospheric, oceanic, and coupled models for meteorological forecasting.pdf" },
  { year: "2025", type: "pdf", title: "AI in Sustainable Industrial Transformation: Industry 4.0 and Industry 5.0", file: "2025 Artificial Intelligence in Sustainable Industrial Transformation A Comparative Study of Industry 4.0 and Industry 5.0..pdf" },
  { year: "2025", type: "pdf", title: "AI-driven precipitation downscaling and projections", file: "2025 Artificial intelligence driven precipitation downscaling and.pdf" },
  { year: "2025", type: "png", title: "Climate and land use change impacts on tropical streamflow using remote sensing and GIS", file: "2025 BooK Chapter_3_A Review on Estimation of Climate and Land Use Change Impacts on Tropical Streamflow Using Remote Sensing and GIS.png" },
  { year: "2025", type: "pdf", title: "Climate Change and Food Security: Adaptation Strategies in Asia", file: "2025 Book Chapter_1_Climate Change and Food Security Agricultural and Non Farm Adaptation Strategies in Asia.pdf" },
  { year: "2025", type: "pdf", title: "Climate change, lifestyle, nutritional adequacy, and sustainable diets", file: "2025 Conference_paper_1_Impact of Climate Change and Lifestyle on Nutritional Adequacy and Sustainable Diets.pdf" },
  { year: "2025", type: "pdf", title: "Detection of climate change signals using hybrid deep learning", file: "2025 Detection of climate change signals using precipitation and temperature time series by a hybrid deep learning framework.pdf" },
  { year: "2025", type: "pdf", title: "Non-noble metal-doped carbon composites for remediation of phthalate", file: "2025 Harnessing non-noble metal-doped carbon composites for remediation of phthalate.pdf" },
  { year: "2025", type: "pdf", title: "Hybrid Deep Learning Versus Empirical Methods for Daily PET", file: "2025 Hybrid Deep Learning Versus Empirical Methods for Daily.pdf" },
  { year: "2025", type: "pdf", title: "Climate-induced streamflow variability using CMIP6 data and advanced modeling", file: "2025 Multidimensional analysis of climate-induced streamflow variability using CMIP6 data and advanced modeling techniques.pdf" },
  { year: "2025", type: "pdf", title: "Rainfall forecasting with GAN and spatiotemporal graph neural networks", file: "2025 Novel deep learning framework for rainfall forecasting integrating generative adversarial and spatiotemporal graph neural networks.pdf" },
  { year: "2025", type: "pdf", title: "ENSO impacts on rainfed rice yields in Thailand", file: "2025 Quantification and prediction of the impact of ENSO on rainfed rice yields in Thailand.pdf" },
  { year: "2025", type: "pdf", title: "Impacts of climate change on agriculture in Thailand", file: "2025 Review A comprehensive review of the impacts of climate change on agriculture in Thailand.pdf" },
  { year: "2025", type: "pdf", title: "Applications of machine learning and deep learning in agriculture", file: "2025 Review Applications of machine learning and deep learning in agriculture A comprehensive review.pdf" },
  { year: "2025", type: "pdf", title: "Artificial intelligence and numerical weather prediction models", file: "2025 Review Artificial intelligence and numerical weather prediction models A technical survey.pdf" },
  { year: "2026", type: "png", title: "Geospatial graph neural network framework for climate variability and crop yields", file: "2026 A geospatial graph neural network framework for analyzing climate variability impacts on crop yields in northeast Thailand.png" },
  { year: "2026", type: "pdf", title: "Circular Biorefinery Pathways for Pesticide Wastewater", file: "2026 Circular Biorefinery Pathways for PesticideWastewater.pdf" },
  { year: "2026", type: "pdf", title: "Deep learning-based direct and indirect potential evapotranspiration", file: "2026 Deep learning-based direct and indirect potential evapotranspiration.pdf" },
  { year: "2026", type: "pdf", title: "Machine learning and deep learning in river basin modeling", file: "2026 Machine learning and deep learning in river basin modeling.pdf" },
  { year: "2026", type: "pdf", title: "Machine/deep learning frameworks for biochar application", file: "2026 Recent advances in machinedeep learning frameworks for biochar application in soil amendment and remediation.pdf" },
  { year: "2026", type: "pdf", title: "Seasonal Groundwater Trends and Predictions in Greenhouse Agriculture", file: "2026 Seasonal Groundwater Trends and Predictions in Greenhouse.pdf" },
  { year: "2026", type: "pdf", title: "WRF Cumulus Parameterization Schemes for Rainfall Prediction in Thailand", file: "2026. High-Resolution Evaluation of WRF Cumulus Parameterization Schemes for Rainfall Prediction in Thailand.pdf" }
];

function publicationUrl(file) {
  return encodeURI(`${publicationFolder}/${file}`);
}

function renderDownloads(filter = "all") {
  const downloadGrid = document.getElementById("download-grid");
  if (!downloadGrid) return;

  const visibleFiles = publicationFiles.filter((item) => filter === "all" || item.year === filter);
  downloadGrid.innerHTML = visibleFiles.map((item) => {
    const url = publicationUrl(item.file);
    const preview = item.type === "pdf"
      ? `<iframe loading="lazy" title="First page preview of ${item.title}" src="${url}#page=1&view=FitH&toolbar=0"></iframe>`
      : `<img loading="lazy" src="${url}" alt="Preview of ${item.title}">`;

    return `
      <article class="download-card">
        <div class="preview-frame">${preview}</div>
        <div class="download-card-body">
          <div class="download-meta">
            <span>${item.year}</span>
            <span>${item.type.toUpperCase()}</span>
          </div>
          <h3>${item.title}</h3>
          <div class="download-actions">
            <a class="mini-button" href="${url}" target="_blank" rel="noopener">Open</a>
            <a class="mini-button strong" href="${url}" download>Download</a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderDownloads(button.dataset.filter);
  });
});

renderDownloads();
