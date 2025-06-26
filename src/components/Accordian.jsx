import { useState } from "react";

function Accordian({title, content}) {
  const [accordianOpen, setAccordianOpen] = useState(false);

  const handleAccordian = () => setAccordianOpen(!accordianOpen);

  return (
    <div className="py-2">
      <button onClick={handleAccordian} className="flex justify-between w-full">
        <span className="ml-2 text-xl font-semibold">{title}</span>
        {accordianOpen ? <span className="mr-2">-</span> : <span className="mr-2">+</span>}
      </button>
      <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
        accordianOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}>
        <div className="overflow-hidden">{content}</div>
      </div>
    </div>
  );
}

export default Accordian;
