export default function ProductRanges() {
  const ranges = [
    { title: "Gama Style", desc: "Potencia la luz y el estilo.", bg: "bg-gray-200" },
    { title: "Gama Nature", desc: "Diseño exclusivo, alma unica.", bg: "bg-stone-200" },
    { title: "Gama Contempo", desc: "Transforma tu casa en tu hogar.", bg: "bg-slate-200" },
  ];

  return (
    <section className="py-20 bg-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Nuestras Gamas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ranges.map((range, index) => (
            <div key={index} className="group cursor-pointer bg-white overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
              {/* Imagen Placeholder */}
              <div className={`h-64 ${range.bg} flex items-center justify-center group-hover:scale-105 transition duration-500`}>
                <span className="text-gray-400 font-bold text-xl">Imagen {range.title}</span>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">{range.title}</h3>
                <p className="text-gray-600 mb-4">{range.desc}</p>
                <span className="text-accent text-sm font-bold uppercase border-b border-transparent group-hover:border-accent transition">Ver colección</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}