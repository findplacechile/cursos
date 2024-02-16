import Content from "@/app/_components/Content";
import Navbar from "@/app/_components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accordionData = [
    {
      id: "section1",
      name: "Menú Principal 1",
      content: "Contenido del Menú Principal 1",
      submenus: [
        { id: "submenu1", name: "Submenú 1" },
        { id: "submenu2", name: "Submenú 2" },
        { id: "submenu3", name: "Submenú 3" },
      ],
    },
    {
      id: "section2",
      name: "Menú Principal 2",
      content: "Contenido del Menú Principal 2",
      submenus: [
        { id: "submenu4", name: "Submenú 4" },
        { id: "submenu5", name: "Submenú 5" },
      ],
    },
    // Agrega más datos según sea necesario
  ];
  return (
    <div className="grid grid-cols-1 h-screen w-screen">
      <Navbar />
      <div className="grid grid-cols-2 w-full md:grid-cols-7">
        <div className="h-full w-full overflow-hidden bg-secondary p-2 md:col-span-5">
          {children}
        </div>
        <div className="md:col-span-2">
          <Content data={accordionData} />
        </div>
      </div>
    </div>
  );
}
