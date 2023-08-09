import React, { useEffect, useRef } from "react";
import "./../App.css";
export const AddProductForm = ({
  formAddProductActive,
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
      { nombre: name, costoKilo: kilo, porcentajeUso: uso, cantidad: quantity },
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

  const cancelButton = () => {
    const $formProduct = formProduct.current;

    $formProduct.classList.remove("form-product--active");
    setTimeout(() => {
      setFormAddProductActive(false);
    }, 500);
  };

  return (
    <>
      <div
        ref={formProduct}
        className="h-screen bg-slate-100 form-product  p-4"
      >
        <h2 className="text-center text-2xl font-bold text-cyan-800">
          Agregar Material
        </h2>

        <form action="">
          <div className="">
            <label className="font-bold" htmlFor="">
              Nombre
            </label>
            <input
              className="border-cyan-700 border rounded-lg mt-2 w-full p-2"
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
              className="border-cyan-700 border rounded-lg mt-2 w-full p-2"
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
              className="border-cyan-700 border rounded-lg mt-2 w-full p-2"
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
              className="border-cyan-700 border rounded-lg mt-2 w-full p-2"
              type="text"
              required
            />
          </div>

          <div className="botones flex gap-4">
            <button
              className=" mt-4 px-4 py-2 bg-cyan-800 text-white rounded-lg capitalize"
              onClick={addMaterial}
            >
              Agregar
            </button>
            <button
              className=" mt-4 px-4 py-2 bg-cyan-800 text-white rounded-lg capitalize"
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
