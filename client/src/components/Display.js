import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getData = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
      const isEmpty = Object.keys(dataArray).length === 0;
      if (!isEmpty) {
        const str = dataArray.toString();
        const str_array = str.split(",");
        console.log(str_array);
        const images = str_array.map((image, i) => {
          return (
            <a href={image} key={i} target="_blank" rel="noreferrer">
              <img
                key={i}
                src={`https://ipfs.io/ipfs/${image.substring(34)}`}
                alt="img"
              />
            </a>
          );
        });
        setData(images);
      } else {
        alert("No image to display");
      }
    } catch (err) {
      alert("You don't have access");
    }
  };
  return (
    <>
      <div className="image-list">{data}</div>
      <input type="text" placeholder="Enter Adress" className="address"></input>
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
};

export default Display;
