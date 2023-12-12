"use client";

import React, { useState } from "react";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const InsuranceForm = () => {
  const [send, setSend] = React.useState(false);
  const [result, setResult] = React.useState(false);
  const canvasRef = React.createRef();
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    bmi: "",
    children: "",
    smoker: "",
    region: "",
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  // Create a new object with modified values
  const modifiedFormData = {
    age: Number(formData.age),
    sex: Number(formData.sex),
    bmi: parseFloat(formData.bmi),
    children: Number(formData.children),
    smoker: Number(formData.smoker),
    region: Number(formData.region),
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/predict/",
        JSON.stringify(modifiedFormData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle the response directly through Axios
      const data = response.data;

      setPrediction(data);
      setSend(true);
      setResult(true);
      console.log(prediction);
      console.log(JSON.stringify(modifiedFormData));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    const documentDefinition = {
      content: [
        {
          text: "Insurance  ",
          style: "header",
        },
        {
          text: "Age: " + formData.age,
        },
        {
          text: "Sex: " + (formData.sex === "0" ? "Female" : "Male"),
        },
        {
          text: "BMI: " + formData.bmi,
        },
        {
          text: "Children: " + formData.children,
        },
        {
          text:
            "Smoker: " + (formData.smoker === "0" ? "Smoker" : "non-smoker"),
        },
        {
          text:
            "Region: " +
            (formData.region === "0"
              ? "Northwest"
              : formData.region === "1"
              ? "Northeast"
              : formData.region === "2"
              ? "Southwest"
              : "Southeast"),
        },
        {
          text: "Prediction: " + `$${prediction}`,
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };
    pdfMake.createPdf(documentDefinition).download("InsuranceDetail.pdf");
  };

  return (
    <div className="container mx-auto px-20">
      <div className="py-10">
        <h2 className="text-center text-2xl ">INSURANCE COST PREDICTOR</h2>
        {send && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Successfully send the detail to the mechine learning model.
            </span>
          </div>
        )}
      </div>
      <div>
        <form class="">
          <div class="-mx-3 mb-6">
            <div class="grid lg:grid-cols-2 gap-3 px-3">
              <div>
                {/* age  */}
                <div>
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Your Age"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                {/* bmi  */}
                <div>
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Bmi
                  </label>

                  <input
                    type="number"
                    name="bmi"
                    value={formData.bmi}
                    onChange={handleChange}
                    placeholder="Your BMI"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>

                {/* children  */}
                <div>
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Children
                  </label>

                  <input
                    type="number"
                    name="children"
                    value={formData.children}
                    onChange={handleChange}
                    placeholder="Your Children"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>

              <div>
                {/* sex  */}
                <div>
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Sex
                  </label>

                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    className="select select-primary w-full max-w-xs"
                  >
                    <option value="0">Male</option>
                    <option value="1"> Female</option>
                  </select>
                </div>

                {/* smoker  */}
                <div>
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Smoker?
                  </label>

                  <select
                    name="smoker"
                    value={formData.smoker}
                    onChange={handleChange}
                    className="select select-primary w-full max-w-xs"
                  >
                    <option value="0">No</option>
                    <option value="1"> Yes</option>
                  </select>
                </div>

                {/* region  */}
                <div className="w-full">
                  <label
                    class="w-full block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Your Region
                  </label>

                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="select select-primary w-full max-w-xs"
                  >
                    <option value="0">South East</option>
                    <option value="1"> South West</option>
                    <option value="2">North East</option>
                    <option value="3">North West</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="md:flex md:items-center">
            <div class="md:w-1/3">
              <button
                onClick={handleSubmit}
                class="shadow mx-5 bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
               Predict
              </button>
              <button
                onClick={handleDownload}
                class="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
               Download
              </button>
            </div>
            
            
          </div>
        </form>
        <div>
        <div className="py-10">
         
          <span>{result && <h2 className="text-3xl">Cost Score is: {`$${prediction}`}</h2>}</span>
        </div>
        
        </div>
      </div>
    </div>
  );
};

export default InsuranceForm;
