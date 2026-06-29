const publicationFolder = "papers";

const publicationFiles = [
  {
    "year": "2022",
    "type": "pdf",
    "title": "On-Farm Composting of Agricultural Waste Materials for Sustainable Agriculture in Pakistan",
    "file": "2022-01.pdf"
  },
  {
    "year": "2022",
    "type": "pdf",
    "title": "Runoff Estimation Using Advanced Soft Computing Techniques A Case Study of Mangla Watershed Pakistan",
    "file": "2022-02.pdf"
  },
  {
    "year": "2023",
    "type": "pdf",
    "title": "Composting Processes for Agricultural Waste Management A Comprehensive Review",
    "file": "2023-03.pdf"
  },
  {
    "year": "2023",
    "type": "pdf",
    "title": "Conference paper 2 Land Use and Land Cover Prediction with QGIS-based Machine Learning Algorithms A Case Study of Tha Chin River Basin, Thailand",
    "file": "2023-04.pdf"
  },
  {
    "year": "2023",
    "type": "pdf",
    "title": "Conference paper 3 Temperature prediction by gene expression programming",
    "file": "2023-05.pdf"
  },
  {
    "year": "2023",
    "type": "pdf",
    "title": "Conference paper 4 Assessment of Advanced Artificial Intelligence Techniques for Flood Forecasting",
    "file": "2023-06.pdf"
  },
  {
    "year": "2023",
    "type": "pdf",
    "title": "Conference paper 5 Monitoring Land Use/Land Cover Change in Tha Chin River Basin",
    "file": "2023-07.pdf"
  },
  {
    "year": "2023",
    "type": "pdf",
    "title": "Imputation of missing daily rainfall data; A comparison between artificial intelligence and statistical techniques",
    "file": "2023-08.pdf"
  },
  {
    "year": "2023",
    "type": "pdf",
    "title": "Potential of Artificial Intelligence-Based Techniques for Rainfall Forecasting in Thailand A Comprehensive Review",
    "file": "2023-09.pdf"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "A critical review of RNN and LSTM variants in hydrological time series predictions",
    "file": "2024-10.pdf"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "Assessment of CMIP6 GCMs for selecting a suitable climate model for precipitation projections in Southern Thailand",
    "file": "2024-11.pdf"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "Book Chapter 2 Assessment of Rainfall Data Imputation Techniques A Comparative Study with Focus on Thai Rainfall Dataset",
    "file": "2024-12.pdf"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "Determination of crop water requirements and potential evapotranspiration for sustainable coffee farming in response to future climate change scenarios",
    "file": "2024-13.pdf"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "Efficient and consistent adaptive mesh generation for geophysical models A case study over the Gulf of Thailand",
    "file": "2024-14.pdf"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "Incorporating novel input variable selection method for in the different water basins of Thailand",
    "file": "2024-15.pdf"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "Influence of El Niño southern oscillation on precipitation variability in Northeast Thailand",
    "file": "2024-16.pdf"
  },
  {
    "year": "2024",
    "type": "png",
    "title": "Remediation of chromium contaminated water and soil by nitrogen and iron doped biochars",
    "file": "2024-17.png"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "Seasonal WaveNetLSTM",
    "file": "2024-18.pdf"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "Time series trend analysis and forecasting of climate variability using deep learning in Thailand",
    "file": "2024-19.pdf"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "A deep learning perspective on meteorological droughts prediction in the Mun River Basin, Thailand",
    "file": "2024-20.pdf"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "Advancements in daily precipitation forecasting A deep dive into daily precipitation forecasting hybrid methods in the Tropical Climate of Thailand",
    "file": "2024-21.pdf"
  },
  {
    "year": "2024",
    "type": "pdf",
    "title": "Hydrological model parameter regionalization Runoff estimation using machine learning techniques in the Tha Chin River Basin Thailand",
    "file": "2024-22.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Advances in artificial intelligence to model the impact of El",
    "file": "2025-23.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Advances in atmospheric, oceanic, and coupled models for meteorological forecasting",
    "file": "2025-24.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Artificial Intelligence in Sustainable Industrial Transformation A Comparative Study of Industry 4.0 and Industry 5.0",
    "file": "2025-25.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Artificial intelligence driven precipitation downscaling and",
    "file": "2025-26.pdf"
  },
  {
    "year": "2025",
    "type": "png",
    "title": "BooK Chapter 3 A Review on Estimation of Climate and Land Use Change Impacts on Tropical Streamflow Using Remote Sensing and GIS",
    "file": "2025-27.png"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Book Chapter 1 Climate Change and Food Security Agricultural and Non Farm Adaptation Strategies in Asia",
    "file": "2025-28.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Conference paper 1 Impact of Climate Change and Lifestyle on Nutritional Adequacy and Sustainable Diets",
    "file": "2025-29.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Detection of climate change signals using precipitation and temperature time series by a hybrid deep learning framework",
    "file": "2025-30.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Harnessing non-noble metal-doped carbon composites for remediation of phthalate",
    "file": "2025-31.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Hybrid Deep Learning Versus Empirical Methods for Daily",
    "file": "2025-32.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Multidimensional analysis of climate-induced streamflow variability using CMIP6 data and advanced modeling techniques",
    "file": "2025-33.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Novel deep learning framework for rainfall forecasting integrating generative adversarial and spatiotemporal graph neural networks",
    "file": "2025-34.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Quantification and prediction of the impact of ENSO on rainfed rice yields in Thailand",
    "file": "2025-35.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Review A comprehensive review of the impacts of climate change on agriculture in Thailand",
    "file": "2025-36.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Review Applications of machine learning and deep learning in agriculture A comprehensive review",
    "file": "2025-37.pdf"
  },
  {
    "year": "2025",
    "type": "pdf",
    "title": "Review Artificial intelligence and numerical weather prediction models A technical survey",
    "file": "2025-38.pdf"
  },
  {
    "year": "2026",
    "type": "png",
    "title": "A geospatial graph neural network framework for analyzing climate variability impacts on crop yields in northeast Thailand",
    "file": "2026-39.png"
  },
  {
    "year": "2026",
    "type": "pdf",
    "title": "Circular Biorefinery Pathways for Pesticide Wastewater",
    "file": "2026-40.pdf"
  },
  {
    "year": "2026",
    "type": "pdf",
    "title": "Deep learning-based direct and indirect potential evapotranspiration",
    "file": "2026-41.pdf"
  },
  {
    "year": "2026",
    "type": "pdf",
    "title": "Machine learning and deep learning in river basin modeling",
    "file": "2026-42.pdf"
  },
  {
    "year": "2026",
    "type": "pdf",
    "title": "Recent advances in machine/deep learning frameworks for biochar application in soil amendment and remediation",
    "file": "2026-43.pdf"
  },
  {
    "year": "2026",
    "type": "pdf",
    "title": "Seasonal Groundwater Trends and Predictions in Greenhouse",
    "file": "2026-44.pdf"
  },
  {
    "year": "2026",
    "type": "pdf",
    "title": "High-Resolution Evaluation of WRF Cumulus Parameterization Schemes for Rainfall Prediction in Thailand",
    "file": "2026-45.pdf"
  }
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
    const preview = item.type === "png"
      ? `<img loading="lazy" src="${url}" alt="Preview of ${item.title}">`
      : `<div class="paper-preview"><span>${item.year}</span><strong>PDF</strong><p>Open the full paper to view the first page and download the file.</p></div>`;

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
