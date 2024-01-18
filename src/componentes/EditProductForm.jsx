/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./../App.css";

export const EditProductForm = ({
  element,
  setFormAddProductActive,
  listMaterial,
  setListMaterial,
}) => {
  const formProduct = useRef();

  const [formValues, setFormValues] = useState({
    name: element.nombre,
    kilo: element.costoKilo,
    uso: element.porcentajeUso,
    quantity: element.cantidad,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    const $formProduct = formProduct.current;

    setTimeout(() => {
      $formProduct.classList.add("form-product--active");
    }, 0);
  }, []);

  const updateMaterial = (event) => {
    const { name, kilo, quantity, uso } = formValues;

    if (!name || !kilo || !quantity || !uso) {
      return "";
    }

    event.preventDefault();

    const updatedItem = {
      id: element.id, // Mantén el mismo ID
      nombre: formValues.name,
      costoKilo: formValues.kilo,
      porcentajeUso: formValues.uso,
      cantidad: formValues.quantity,
    };

    const updatedList = listMaterial.map((material) =>
      material.id === element.id ? updatedItem : material
    );
    setListMaterial(updatedList);

    const $formProduct = formProduct.current;

    $formProduct.classList.remove("form-product--active");
    setTimeout(() => {
      setFormAddProductActive(false);
    }, 500);
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
        {/* Resto del código... */}
        <form className="max-w-2xl mx-auto" action="">
          <div className="">
            <label className="font-bold" htmlFor="">
              Nombre
            </label>
            <input
              className="w-full p-2 mt-2 border rounded-lg border-cyan-700"
              type="text"
              name="name"
              required
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <label className="font-bold" htmlFor="">
              Costo por Kilo
            </label>
            <input
              className="w-full p-2 mt-2 border rounded-lg border-cyan-700"
              type="text"
              name="kilo"
              required
              value={formValues.kilo}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <label className="font-bold" htmlFor="">
              Porcentaje de uso(%)
            </label>
            <input
              className="w-full p-2 mt-2 border rounded-lg border-cyan-700"
              type="text"
              name="uso"
              required
              value={formValues.uso}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <label className="font-bold" htmlFor="">
              Cantidad
            </label>
            <input
              className="w-full p-2 mt-2 border rounded-lg border-cyan-700"
              type="text"
              name="quantity"
              required
              value={formValues.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4 botones">
            <button
              className="px-4 py-2 mt-4 text-white capitalize rounded-lg bg-cyan-800"
              onClick={updateMaterial}
            >
              Actualizar
            </button>
            <button
              className="px-4 py-2 mt-4 text-white capitalize rounded-lg bg-cyan-800"
              onClick={cancelButton}
            >
              Cancelar
            </button>
          </div>
          {/* ... (resto del código) */}
        </form>
      </div>
    </>
  );
};
