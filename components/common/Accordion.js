import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Accordion = ({ name, title, content, isActive, setIsActive }) => {
  const handleToggle = (index) => {
    if (isActive === index) {
      setIsActive("");
    } else {
      setIsActive(index);
    }
  };
  return (
    <div className=" rounded-lg overflow-hidden bg-white">
      <div className="ml-auto mt-5 mr-5 h-5 w-5 text-bold shrink-0 transition-transform duration-200 ease-in-out ">
        {isActive === name ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <h2 className="mb-0 mt-[-34px]" onClick={() => handleToggle(name)}>
        <div
          className="group !border-b-0 !shadow-none relative flex items-center w-full xl:p-4 lg:py-3 xs:py-3 py-2 px-4 text-gray-900 text-sm font-bold text-left transition focus:outline-none"
          // type="div"
        >
          {title}
        </div>
      </h2>
      <div
        className={`!visible border-0 show ${
          isActive === name ? "" : "hidden"
        }`}
      >
        <div className=" pb-4 px-5">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
