import { useEffect, useState } from "react";

const ReadMore = ({ children  }) => {
  const [text, setText] = useState("");
  const [length , setLength] = useState("");
  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  
 

  useEffect(() => {
   
    if (!isReadMore) {
      setText(children);
    } else {
      setText(children);
    }
  }, [isReadMore, children]);
  return (
    <>
      <div
        id="id"
        className={`description text-gray-800 xl:text-base text-sm break-words  2xl:py-4 xl:py-3 py-1.5 ${isReadMore ? "" : "about-shadow overflow-hidden h-44 relative"
          }`}
        dangerouslySetInnerHTML={{
          __html: text && text.replace(/\n/g, "<br/>"),
        }}
      ></div>
      <button
        onClick={() => {
          toggleReadMore();
        }}
        className="text-theme font-bold py-3 lg:text-base text-sm about-btn z-50"
      >
        See {isReadMore ? `Less` : `More`}
      </button>
    </>
  );
};

export default ReadMore;
