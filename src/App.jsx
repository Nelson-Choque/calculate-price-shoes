import { useRef, useState } from "react";

import "./App.css";
import { AddProductForm } from "./componentes/AddProductForm.jsx";
import { materialData } from "./data/material.js";
import { EditProductForm } from "./componentes/EditProductForm.jsx";

function App() {
  const inputPesoMedias = useRef();
  const inputCostoProduccion = useRef();

  const [formAddProductActive, setFormAddProductActive] = useState(false);
  //*edit product

  const [formEditProductActive, setEditProductActive] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  const [listMaterial, setListMaterial] = useState(materialData);

  const showFormAddProduct = (event) => {
    event.preventDefault();
    setFormAddProductActive(true);
  };
  const showFormEditProduct = (event, material) => {
    event.preventDefault();
    setSelectedElement(material);
    setEditProductActive(true);
  };

  const calculateCost = (event) => {
    if (!inputPesoMedias.current.value) {
      return "";
    }

    event.preventDefault();

    //* iniital counter values

    let sumaPrecios = 0;

    //* Calculate total percentage of sock

    const totalPorcentajes = listMaterial.reduce(
      (acumulador, e) => acumulador + parseInt(e.porcentajeUso) * e.cantidad,
      0
    );

    //* loop through array items

    listMaterial.forEach((e) => {
      //* calculate percentage of sock
      const porcentajeReal = (
        ((parseFloat(e.porcentajeUso) *
          parseFloat(inputPesoMedias.current.value)) /
          parseFloat(totalPorcentajes)) *
        e.cantidad
      ).toFixed(2);

      //* calculate material cost

      const precioReal = (porcentajeReal * parseInt(e.costoKilo)).toFixed(2);

      //* increase the total price

      sumaPrecios += parseFloat(precioReal);
    });

    inputCostoProduccion.current.value = sumaPrecios.toFixed(2);
  };

  const onDeleteElement = (event, material) => {
    event.preventDefault();

    console.log(material);

    const updatedMaterial = listMaterial.filter(
      (elemento) => elemento.id !== material.id
    );

    setListMaterial(updatedMaterial);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <h2 className="p-2 text-2xl font-bold text-center capitalize text-cyan-800">
          Calcular Costo de produccion de Medias
        </h2>
        <form className="p-4 " action="">
          <div className="">
            <label className="font-bold" htmlFor="">
              Peso de la medias (kg)
            </label>
            <input
              className="w-full p-2 mt-2 border rounded-lg border-cyan-700"
              type="text"
              required
              ref={inputPesoMedias}
            />
          </div>

          <div className="mt-4">
            <label className="font-bold" htmlFor="">
              Materiales de producto
            </label>
            <button
              className="block px-4 py-2 mt-4 text-white capitalize rounded-lg bg-cyan-800"
              onClick={showFormAddProduct}
            >
              agregar
            </button>

            <div className="p-2 mt-4 border border-cyan-700 rounded-xl ">
              <h2 className="text-xl font-bold text-center text-cyan-800">
                Materiales
              </h2>
              <hr className="my-2" />
              <div className="overflow-scroll">
                <table className="mx-auto mb-2 overflow-scroll">
                  <thead>
                    <tr>
                      <th className="th">Nombre</th>
                      <th className="th">Costo por Kilo</th>
                      <th className="th">Porcentaje de Uso (%)</th>
                      <th className="th">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody className="mx-auto">
                    {listMaterial.map((persona) => (
                      <tr className="tr" key={persona.id}>
                        <td className="td">{persona.nombre}</td>
                        <td className="td">s/{persona.costoKilo}</td>
                        <td className="td">{persona.porcentajeUso}%</td>
                        <td className="td">{persona.cantidad}</td>
                        <td className="p-2 td">
                          <button
                            className="block px-4 py-2 text-white bg-cyan-900 rounded-2xl"
                            onClick={(event) => {
                              showFormEditProduct(event, persona);
                            }}
                          >
                            editar
                          </button>
                        </td>
                        <td className="p-2 td">
                          <button
                            className="block px-4 py-2 text-white bg-cyan-900 rounded-2xl"
                            onClick={(event) => onDeleteElement(event, persona)}
                          >
                            eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex gap-4 botones">
              <button
                className="block px-4 py-2 mt-4 text-white capitalize rounded-lg bg-cyan-800"
                onClick={calculateCost}
              >
                Calcular Costo
              </button>
              <button
                className="block px-4 py-2 mt-4 text-white capitalize rounded-lg bg-cyan-800"
                onClick={(event) => {
                  event.preventDefault();
                  setListMaterial([]);
                  inputCostoProduccion.current.value = "";
                  inputPesoMedias.current.value = "";
                }}
              >
                Limpiar Datos
              </button>
            </div>

            <div className="mt-4">
              <label className="font-bold" htmlFor="">
                Costo de produccion de la medias
              </label>
              <input
                className="w-full p-2 mt-2 border rounded-lg border-cyan-700"
                type="text"
                name=""
                id=""
                readOnly
                ref={inputCostoProduccion}
              />
            </div>
          </div>
        </form>
        {formAddProductActive && (
          <AddProductForm
            formAddProductActive={formAddProductActive}
            setFormAddProductActive={setFormAddProductActive}
            listMaterial={listMaterial}
            setListMaterial={setListMaterial}
          />
        )}
        {formEditProductActive && (
          <EditProductForm
            element={selectedElement}
            formAddProductActive={formEditProductActive}
            setFormAddProductActive={setEditProductActive}
            listMaterial={listMaterial}
            setListMaterial={setListMaterial}
          />
        )}
      </div>
    </>
  );
}

export default App;
