import { useRef, useState } from "react";

import "./App.css";
import { AddProductForm } from "./componentes/AddProductForm.jsx";

function App() {
  const inputPesoMedias = useRef();
  const inputCostoProduccion = useRef();

  const [formAddProductActive, setFormAddProductActive] = useState(false);
  const [listMaterial, setListMaterial] = useState([
    {
      nombre: "algodon",
      costoKilo: "18",
      porcentajeUso: "60",
      cantidad: "1",
    },
    {
      nombre: "Elastico",
      costoKilo: "24",
      porcentajeUso: "40",
      cantidad: "1",
    },
    {
      nombre: "nylon verde",
      costoKilo: "38",
      porcentajeUso: "30",
      cantidad: "2",
    },
    {
      nombre: "nylon blanco",
      costoKilo: "38",
      porcentajeUso: "20",
      cantidad: "2",
    },
    {
      nombre: "Lycra",
      costoKilo: "28",
      porcentajeUso: "60",
      cantidad: "1",
    },
    {
      nombre: "Sport",
      costoKilo: "11",
      porcentajeUso: "60",
      cantidad: "1",
    },
    {
      nombre: "Polyester",
      costoKilo: "18",
      porcentajeUso: "40",
      cantidad: "2",
    },
  ]);

  const showFormAddProduct = (event) => {
    event.preventDefault();
    setFormAddProductActive(true);
  };

  const calculateCost = (event) => {
    if (!inputPesoMedias.current.value) {
      return "";
    }

    event.preventDefault();
    let costo = 0;
    let cantidadDeKilos = 0;

    let costoPorcentaje = 0;
    let porcentajePeso = 0;
    let sumaPrecios = 0;
    console.log("peso medias: " + inputPesoMedias.current.value);

    const totalPorcentajes = listMaterial.reduce(
      (acumulador, e) => acumulador + parseInt(e.porcentajeUso) * e.cantidad,
      0
    );

    listMaterial.forEach((e) => {
      const porcentajeReal = (
        ((parseFloat(e.porcentajeUso) *
          parseFloat(inputPesoMedias.current.value)) /
          parseFloat(totalPorcentajes)) *
        e.cantidad
      ).toFixed(2);

      const precioReal = (porcentajeReal * parseInt(e.costoKilo)).toFixed(2);

      sumaPrecios += parseFloat(precioReal);

      console.log({ precioReal });

      console.log({ sumaPrecios });

      console.log("result" + porcentajeReal);
      costo += parseFloat(e.costoKilo) * parseFloat(e.cantidad);
      cantidadDeKilos += 1 * parseFloat(e.cantidad);
      costoPorcentaje += ((e.costoKilo * e.porcentajeUso) / 100) * e.cantidad;
      porcentajePeso += (e.porcentajeUso / 100) * e.cantidad;

      console.log("porcentaje peso:" + porcentajePeso);
      // console.log({
      //   costo: e.costoKilo,
      //   cantidad: e.cantidad,
      //   total: parseFloat(e.costoKilo) * parseFloat(e.cantidad),
      //   porcentaje: e.porcentajeUso,
      //   costoPorcentaje: ((e.costoKilo * e.porcentajeUso) / 100) * e.cantidad,
      //   porcentajePeso:
      //     ((inputPesoMedias.current.value * e.porcentajeUso) / 100) *
      //     e.cantidad,
      // });
    });

    console.log(costoPorcentaje);
    console.log(porcentajePeso);
    console.log(costo);
    console.log(cantidadDeKilos);
    console.log({ sumaPrecios });
    inputCostoProduccion.current.value = sumaPrecios;

    /////
    // inputCostoProduccion.current.value =
    //   "s/" +
    //   ((costo * inputPesoMedias.current.value) / cantidadDeKilos).toFixed(2);
  };

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <h2 className="p-2 text-2xl text-center capitalize font-bold text-cyan-800">
          Calcular Costo de produccion de Medias
        </h2>
        <form className=" p-4" action="">
          <div className="">
            <label className="font-bold" htmlFor="">
              Peso de la medias (kg)
            </label>
            <input
              className="border-cyan-700 border rounded-lg mt-2 w-full p-2"
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
              className="block mt-4 px-4 py-2 bg-cyan-800 text-white rounded-lg capitalize"
              onClick={showFormAddProduct}
            >
              agregar
            </button>

            <div className="mt-4 p-2 border-cyan-700 border rounded-xl ">
              <h2 className="font-bold text-cyan-800 text-center text-xl">
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
                      <tr key={persona.id}>
                        <td className="td">{persona.nombre}</td>
                        <td className="td">s/{persona.costoKilo}</td>
                        <td className="td">{persona.porcentajeUso}%</td>
                        <td className="td">{persona.cantidad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="botones flex gap-4">
              <button
                className="block mt-4 px-4 py-2 bg-cyan-800 text-white rounded-lg capitalize"
                onClick={calculateCost}
              >
                Calcular Costo
              </button>
              <button
                className="block mt-4 px-4 py-2 bg-cyan-800 text-white rounded-lg capitalize"
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
                className="border-cyan-700 border rounded-lg mt-2 w-full p-2"
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
      </div>
    </>
  );
}

export default App;
