import React, { useState, useEffect } from "react";
import Header from "./Header";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setPlants(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
// Search functionality for filtering plants by name
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );  

  
  const addNewPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  return (
    <div className="app">
      <Header />
      <NewPlantForm onAddPlant={addNewPlant} />
       <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> 
      <PlantList plants={filteredPlants} />
     
    </div>
  );
}

export default App;
