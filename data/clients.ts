// Marcas / clientes. logo: imagen en /public/clients (idealmente PNG o SVG sin fondo).
// Si logo está vacío se muestra el nombre en texto.
export type Client = { name: string; logo?: string };

export const clients: Client[] = [
  { name: "Marca Uno" },
  { name: "Studio Norte" },
  { name: "Agencia Sur" },
  { name: "Cliente Cuatro" },
  { name: "Brand Co." },
  { name: "Media Lab" },
];
