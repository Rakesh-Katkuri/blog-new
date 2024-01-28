import React from "react";

const Header = ({
  HeaderText,
  CaptionText,
  textAlign,
  color,
  backgroundColor,
  padding,
}) => {
  const divStyle = {
    width: "100%",
    textAlign,
    backgroundColor: "#1D5356",
    color: "#F8F9F9",
    padding: "10rem",
  };
  return (
    <div style={divStyle} className="header position-relative">
      <div className=" position-absolute top-50 start-50 translate-middle custom-header-texts">
        <h1 className="">
          <strong>{HeaderText}</strong>
        </h1>
        <p>{CaptionText}</p>
      </div>
    </div>
  );
};

export default Header;

// import React from "react";

// const Header = () => {
//   const divStyle = {
//     backgroundImage:
//       'url("https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?cs=srgb&dl=pexels-asad-photo-maldives-457882.jpg&fm=jpg")',
//     backgroundSize: "cover",
//     height: "350px",
//     width: "100%",
//   };
//   return (
//     <div style={divStyle} className="header ">
//       <div
//         className="container headertitles d-flex flex-column text-center mt-auto mb-auto "
//         // style={{backgroundImage: URL('https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?cs=srgb&dl=pexels-asad-photo-maldives-457882.jpg&fm=jpg'), height: "450px" }}
//       >
//         <h3 className="container headertitles d-flex flex-column text-center mt-auto mb-auto ">
//           Welcome to our photo-sharing blog. Explore, discover, and share
//           beautiful moments.
//         </h3>
//       </div>
//     </div>
//   );
// };

// export default Header;
