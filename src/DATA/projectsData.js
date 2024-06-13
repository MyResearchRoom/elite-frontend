import { projects } from "../assets/images/projects";

export const projectsData = [
  {
    id: 1,
    image: projects.proj1,
    category: "FEA - Finite Element Analysis",
    title: "ANSYS Fluent for CFD Analysis of CO2 Piping System Flow",
    description: "The Computational Fluid Dynamics (CFD) analysis conducted to determine the time required to empty seven CO2 cylinders, each with a volume of 67.5 Liters. ",
    mainpara2:
      "The analysis focuses on the piping layout connecting these cylinders to a manifold, considering the flow of CO2 under specified pressure conditions.",
    subpara1:
      "Transient state CFD analysis is performed with incompressible flow. To solve airflow, the Reynolds average Navier stokes equation are employed with k-ω SST turbulence model. Minimum orthogonal quality of 0.2 is maintained in the discretized domain, as per standard practices.",
    subpara2:
      "The following governing equations and models were used for analysis:",
    subpara3:
      "• Conservation of mass, • Conservation of momentum,• K-w-SST model- for turbulence ",
    subimg1: projects.FEASubImage1,
    subimg2: projects.FEASubImage2,
    subimg3: projects.FEASubImage3,

  },
  {
    id: 2,
    image: projects.proj2,
    category: "Computational Fluid Dynamics",
    title: "How Can ANSYS-FLUENT Software Predict Pressure Drop in Marine Ship Chimney Incinerator?",
    description: "Computational fluid dynamics (CFD) is a technique of modelling and simulation based on numerical modelling for fluid flow. In CFD, basic three steps are involved i.e., Pre-Processing, Solver and Post Processing. This work specifically addresses the CFD analysis of incinerator chimney. The three dimensional steady state CFD analysis is carried out using ANSYS-FLUENT software to predict the pressure drop in the chimney. The CAD model was received by client, which was used for making internal fluid volume. A Computational Fluid Dynamics (CFD) domain (i.e., enclosed volume) is the portion of space where the solution of the CFD simulation is calculated. The domain is created to perform the internal flow analysis which is shown in the below figures. The dimensions of domain are selected from experience and best practices of CFD.",
    mainpara2: "CFD analysis of chimney structure for various models is performed to calculate pressure drop.",
    subpara2 : "In the first load case, the pressure drop was determined by performing CFD analysis on the existing model.",
    subpara3 : "In Second Load case, an internal fan (Axial Blower) was incorporated into the model to achieve the desired pressure drop",
    point3: "• In Third Load case, a 200 NB additional line from the 500 NB pipe parallel to incinerator exhaust till the top was incorporated into the model to achieve the desired pressure drop.",
    point4: "• In Fourth Load case, the new location of fan is selected as maintenance point of view that is 8 meters Height from the inlet of incinerator.",
    subimg1: projects.CFDSubImage1,
    subimg2: projects.CFDSubImage2,
    subimg3: projects.CFDSubImage3,
    subimg4: projects.CFDSubImage4
  },
  // {
  //   id: 3,
  //   image: projects.proj3,
  //   category: "Solar Plant Design",
  //   title: "Morem ipsum dolor sit amet, consectetur adipiscing elit. ",
  //   description: "Enhancing Value Through Optimised Engineering Solutions",
  //   mainpara2:
  //     "Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit.",
  // },
  // {
  //   id: 4,
  //   image: projects.proj1,
  //   category: "FEA - Finite Element Analysis",
  //   title: "Morem ipsum dolor sit amet, consectetur adipiscing elit. ",
  //   description: "Enhancing Value Through Optimised Engineering Solutions",
  //   mainpara2:
  //     "Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit.",

  // },

];
