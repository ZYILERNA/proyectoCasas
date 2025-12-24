// components/ProductDetail.js
import { productData } from '../data/products'; // <--- AQUÍ IMPORTAMOS TUS DATOS
import { Ruler, Box, Info } from 'lucide-react';

export default function ProductDetail() {
  const product = productData;

  // Si no hay datos, mostramos un aviso para que no se rompa
  if (!product) return <div>Cargando datos...</div>;

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      
      {/* 1. SECCIÓN PRINCIPAL */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen falsa (placeholder) */}
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center text-gray-400 border-2 border-dashed">
             {/* IMAGEN DEL PRODUCTO */}
<div className="bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
  {product.image ? (
    <img 
      src={product.image} 
      alt={product.name} 
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
    />
  ) : (
    <div className="flex items-center justify-center h-96 text-gray-400">
      Sin imagen
    </div>
  )}
</div>
          </div>
          
          {/* Datos del producto */}
          <div>
            <span className="text-red-600 font-bold tracking-widest text-sm uppercase mb-2 block">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-light text-gray-800 mb-6">
              ¥ {product.basePrice ? product.basePrice.toLocaleString() : '0'}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <button className="bg-black text-white px-8 py-4 font-bold hover:bg-gray-800 transition rounded">
              CONSULTAR DISPONIBILIDAD
            </button>
          </div>
        </div>
      </div>

      {/* 2. TABLA DE MÓDULOS (La parte difícil) */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Box size={24} /> Módulos y Medidas
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.modules && product.modules.map((mod, index) => (
              <div key={index} className="bg-white p-4 border rounded hover:shadow-md transition">
                <div className="text-3xl font-bold text-gray-200 mb-2">{mod.code}</div>
                <h3 className="font-bold text-lg text-black">{mod.name}</h3>
                <div className="text-sm text-gray-500 mt-2">
                  <p>📏 {mod.size}</p>
                  <p>📦 {mod.volume}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}