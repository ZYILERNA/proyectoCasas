import { Users, Factory, DoorOpen, Ruler } from 'lucide-react';

const statsData = [
  { number: "+2.4M", label: "Puertas al año", icon: DoorOpen },
  { number: "+26M", label: "Metros de moldura", icon: Ruler },
  { number: "800", label: "Empleados", icon: Users },
  { number: "4", label: "Centros Producción", icon: Factory },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Grupo lider en el sector</h2>
          <p className="text-gray-600">
            Dimoldura es el grupo lider del sector de la madera. Integramos tecnología y artesanía para ofrecer la mejor calidad a nivel europeo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition">
                <Icon className="w-10 h-10 text-accent mx-auto mb-4" />
                <span className="block text-4xl font-bold text-primary mb-2">{stat.number}</span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}