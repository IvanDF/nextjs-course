import Link from "next/link";

export function ClientsPage() {
  const clients = [
    {
      id: "max",
      name: "Maximilian",
    },
    {
      id: "Lu",
      name: "Luke",
    },
  ];

  return (
    <div>
      <h2>Clients page</h2>
      {clients.map((client) => (
        <li>
          <Link href={{ pathname: "/clients/[id]", query: { id: client.id } }}>
            {client.name}
          </Link>
        </li>
      ))}
    </div>
  );
}

export default ClientsPage;
