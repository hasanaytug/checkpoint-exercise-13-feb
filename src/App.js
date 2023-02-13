import "./App.css";
import { useState, useEffect } from "react";

const url = "http://localhost:3001/api/posts";
let idStart = 1;
function App() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState("New");
  const [updateText, setUpdateText] = useState("Update");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const jsonObj = await res.json();
      setData(jsonObj);
    };
    fetchData();
    console.log(data);
  }, []);

  const handleInputChange = (e) => {
    setNewData(e.target.value);
  };

  const handleAddText = async () => {
    const newDataObj = {
      id: idStart,
      text: newData,
      time: 1,
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDataObj),
    });
    console.log("clicked");
    setData([...data, newDataObj]);
    idStart += 1;
  };

  const handleDelete = async (id) => {
    const res = await fetch(url + id, {
      method: "DELETE",
    });
    const filteredData = data.filter((el) => el.id !== id);
    setData(filteredData);
  };

  const handleUpdateClick = async (id) => {
    const res = await fetch(url + "/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: updateText }),
    });
    setData((data) =>
      data.map((el) => {
        if (el.id === id) {
          el.text = updateText;
        }
        return el;
      })
    );
  };

  return (
    <div className="main-content">
      <input type="text" value={newData} onChange={handleInputChange} />
      <input
        type="text"
        value={updateText}
        onChange={(e) => setUpdateText(e.target.value)}
      />
      <button onClick={handleAddText}>Add Text</button>
      {data.map((el) => {
        return (
          <div key={el.id}>
            <h2>
              {el.text}{" "}
              <button onClick={() => handleUpdateClick(el.id)}>Update</button>
            </h2>
            <button onClick={() => handleDelete(el.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
