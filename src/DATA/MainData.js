

import finite_bg from "../assets/Projects/finite_bg.jpeg"
import fluid_bg from "../assets/Projects/fluid_bg.jpeg"
import solar_bg from "../assets/Projects/solar_bg.jpeg";
import pressure_bg  from "../assets/Projects/pressure_bg.jpeg";
import structural_bg from "../assets/Projects/structural_bg.jpeg"
import piping_bg from "../assets/Projects/piping_bg.jpeg"

// *************************  Project Details Images ***********************


import p2 from "../assets/Projects/p2.jpeg"
import p3 from "../assets/Projects/p3.jpeg"

import fea1 from "../assets/Projects/FEAProject.png";
import fea2 from "../assets/Projects/FEAProject1.png";
import fea3 from "../assets/Projects/FEAProject2.png";

import cfd2 from "../assets/Projects/CFDImage2.png";

// import CFD from "../../assets/projectCarousel/CFD.png";
import CFD from "../assets/projectCarousel/CFD.png"

const MainData = {
  FEA: {
    image: finite_bg,
    category: "FEA - Finite Element Analysis",
    description:
      "Finite Element Analysis (FEA) is a computational technique used to simulate and analyze complex physical phenomena by dividing them into smaller, more manageable elements for accurate engineering analysis and design optimization.",
    subprojects: [
      // Add more subprojects here if needed
    ],
  },
  // Add more projects here if needed
  Fluid: {
    image: fluid_bg,
    category: "Computational Fluid Dynamics",
    description:
      "Computational Fluid Dynamics (CFD) is the numerical simulation of fluid flow and heat transfer phenomena using computational methods.",
    subprojects: [
      {
        img: p2,
        text: "Lorem ipsum",
        loc: "Pune",
        date: "2023-05-15",
        title:
          "How Can ANSYS-FLUENT Software Predict Pressure Drop in Marine Ship Chimney Incinerator?",
        mainparagraph:
          "Computational fluid dynamics (CFD) is a technique of modelling and simulation based on numerical modelling for fluid flow. In CFD, basic three steps are involved i.e., Pre-Processing, Solver and Post Processing. This work specifically addresses the CFD analysis of incinerator chimney. The three dimensional steady state CFD analysis is carried out using ANSYS-FLUENT software to predict the pressure drop in the chimney. ",
        details: [
          {
            img: CFD,
            description:
              "The analysis aims to calculate the pressure drop across the chimney.\
              The pressure drop analysis of the chimney using CFD, involved multiple load cases. \
              In the first load case, the pressure drop was determined by performing CFD analysis on the existing model. \
              Subsequently, an internal fan (Axial Blower) was incorporated into the model to achieve the desired pressure drop.\
              Multiple iterations were conducted, considering various fan performance data, leading to the selection of a specific fan configuration that successfully achieved the desired pressure drop across the chimney.\
              In the fourth load case, the pressure drop was determined by performing CFD analysis on the new blower location model. An inlet volume flow rate of 200 m3/min is applied at the inlet.\
              The outlet is taken as pressure outlet. Rest all surfaces are treated as walls with no-slip condition.",
          },
          {
            img: cfd2,
            description:
              "CFD analysis of chimney structure for various models is performed to calculate pressure drop. \
              In the first load case, the pressure drop was determined by performing CFD analysis on the existing model. \
              In Second Load case, an internal fan (Axial Blower) was incorporated into the model to achieve the desired pressure drop \
              In Third Load case, a 200 NB additional line from the 500 NB pipe parallel to incinerator exhaust till the top was incorporated into the model to achieve the desired pressure drop. \
             In Fourth Load case, the new location of fan is selected as maintenance point of view that is 8 meters Height from the inlet of incinerator.",
          },
        ],
      },
      {
        img: p3,
        loc: "Pune",
        date: "2023-05-15",
        text: "Lorem ipsum",
        title: "ANSYS Fluent for CFD Analysis of CO2 Piping System Flow",
        mainparagraph:
          "The Computational Fluid Dynamics (CFD) analysis conducted to determine the time required to empty seven CO2 cylinders, each with a volume of 67.5 Liters\
                          The analysis focuses on the piping layout connecting these cylinders to a manifold, considering the flow of CO2 under specified pressure conditions.",
        details: [
          {
            img: fea1,

            description:
              "Transient state CFD analysis is performed with incompressible flow. To solve airflow, the Reynolds average Navier stokes equation are employed with k-ω SST turbulence model. ",
          },
          {
            img: fea2,
            description:
              "Minimum orthogonal quality of 0.2 is maintained in the discretized domain, as per standard practices.",
          },
          {
            img: fea3,
            description:
              " The following governing equations and models were used for analysis: - \
                               Conservation of mass \
                               Conservation of momentum \
                               K-w-SST model- for turbulence",
          },
        ],
      },

      // Add more subprojects here if needed
    ],
  },
  Piping: {
    image: piping_bg,
    category: "Piping Analysis & Pipe Modeling",
    description:
      "Piping analysis and pipe modeling involve assessing the performance, integrity, and behavior of piping systems through computational methods and accurate 3D representations.",
    subprojects: [
      // Add subprojects here
    ],
  },
  Solar: {
    image: solar_bg,
    category: "Solar Plant Design",
    description:
      "Solar plant design involves creating efficient layouts and configurations for harnessing solar energy to generate electricity.",
    subprojects: [
      // Add subprojects here
    ],
  },
  PressureVessel: {
    image: pressure_bg,
    category: "Pressure Vessel & Static Equipment",
    description:
      "Pressure vessel and static equipment involve the design and engineering of structures intended to contain fluids or gases under pressure without undergoing significant deformation.",
    subprojects: [
      // Add subprojects here
    ],
  },
  Structural: {
    image: structural_bg,
    category: "Structural Engineering",
    description:
      "Structural engineering is the design and analysis of structures to ensure they are safe, stable, and capable of withstanding loads and environmental conditions.",
    subprojects: [
      // Add subprojects here
    ],
  },
};

export default MainData;
