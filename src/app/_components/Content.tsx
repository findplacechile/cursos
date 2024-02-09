"use client"

import React, { useState } from 'react';

interface Submenu {
  id: string;
  name: string;
}

interface AccordionData {
  id: string;
  name: string;
  content: string;
  submenus: Submenu[];
}

interface AccordionProps {
  data: AccordionData[];
}

const Content: React.FC<AccordionProps> = ({ data }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleAccordion = (sectionId: string) => {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
  };

  return (
    <div className="flex flex-col w-72">
      {data.map((item) => (
        <div key={item.id} className="border-b">
          <div
            onClick={() => toggleAccordion(item.id)}
            className="cursor-pointer p-4 bg-gray-100 border-b"
          >
            {item.name}
          </div>
          {openSection === item.id && (
            <div className="p-4">
              <p>{item.content}</p>
              <ul>
                {item.submenus.map((submenu) => (
                  <li key={submenu.id}>{submenu.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Content;
