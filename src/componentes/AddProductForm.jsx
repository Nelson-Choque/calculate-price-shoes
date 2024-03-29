/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import "./../App.css";

export const AddProductForm = ({
  setFormAddProductActive,
  listMaterial,
  setListMaterial,
}) => {
  const formProduct = useRef();
  const inputName = useRef();
  const inputUso = useRef();
  const inputQuantity = useRef();
  const inputKilo = useRef();

  useEffect(() => {
    const $formProduct = formProduct.current;

    setTimeout(() => {
      $formProduct.classList.add("form-product--active");
    }, 0);
  }, []);

  const addMaterial = (event) => {
    const { name, kilo, quantity, uso } = getMaterial();

    if (!name || !kilo || !quantity || !uso) {
      return "";
    }

    event.preventDefault();
    setListMaterial([
      ...listMaterial,
      {
        id: uuid(),
        nombre: name,
        costoKilo: kilo,
        porcentajeUso: uso,
        cantidad: quantity,
      },
    ]);
    const $formProduct = formProduct.current;

    $formProduct.classList.remove("form-product--active");
    setTimeout(() => {
      setFormAddProductActive(false);
    }, 500);
  };

  const getMaterial = () => {
    return {
      name: inputName.current.value,
      kilo: inputKilo.current.value,
      quantity: inputQuantity.current.value,
      uso: inputUso.current.value,
    };
  };

  const cancelButton = (event) => {
    event.preventDefault();
    const $formProduct = formProduct.current;

    $formProduct.classList.remove("form-product--active");
    setTimeout(() => {
      setFormAddProductActive(false);
    }, 500);
  };

  return (
    <>
      <div ref={formProduct} className="h-screen p-4 bg-slate-100 form-product">
        <h2 className="text-2xl font-bold text-center text-cyan-800">
          Agregar Material
        </h2>

        <form className="max-w-2xl mx-auto" action="">
          <div className="">
            <label className="font-bold" htmlFor="">
              Nombre
            </label>
            <input
              className="w-full p-2 mt-2 border rounded-lg border-cyan-700"
              type="text"
              ref={inputName}
              required
            />
          </div>

          <div className="mt-4">
            <label className="font-bold" htmlFor="">
              Costo por Kilo
            </label>
            <input
              ref={inputKilo}
              className="w-full p-2 mt-2 border rounded-lg border-cyan-700"
              type="text"
              required
            />
          </div>

          <div className="mt-4">
            <label className="font-bold" htmlFor="">
              porcentaje de uso(%)
            </label>
            <input
              ref={inputUso}
              className="w-full p-2 mt-2 border rounded-lg border-cyan-700"
              type="text"
              required
            />
          </div>

          <div className="mt-4">
            <label className="font-bold" htmlFor="">
              Cantidad
            </label>
            <input
              ref={inputQuantity}
              className="w-full p-2 mt-2 border rounded-lg border-cyan-700"
              type="text"
              required
            />
          </div>

          <div className="flex gap-4 botones">
            <button
              className="px-4 py-2 mt-4 text-white capitalize rounded-lg bg-cyan-800"
              onClick={addMaterial}
            >
              Agregar
            </button>
            <button
              className="px-4 py-2 mt-4 text-white capitalize rounded-lg bg-cyan-800"
              onClick={cancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
