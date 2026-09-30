// Creadores y marcas. type: "creador" | "marca".
// logo (opcional): imagen en /public/clients (idealmente PNG o SVG sin fondo). Sin logo se muestra el nombre.
// note (opcional): texto pequeño bajo el nombre.
export type Client = { name: string; type: "creador" | "marca"; logo?: string; note?: string };

export const clients: Client[] = [
  { name: "Rakyz", type: "creador" },
  { name: "Diego Venegas", type: "creador" },
  { name: "Blumecl", type: "creador" },
  { name: "Vichoobtw", type: "creador" },
  { name: "Flavia Martin", type: "creador" },
  { name: "Weones Pencas", type: "creador", note: "Podcast" },
  { name: "AMD", type: "marca" },
  { name: "Fortnite", type: "marca" },
  { name: "MG Motors", type: "marca" },
  { name: "Delicious Pro", type: "marca" },
];
