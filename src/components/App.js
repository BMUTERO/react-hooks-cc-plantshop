import React, { useState, useEffect } from "react";
import Header from "./Header";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch plants
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => {
        const plantsWithStock = data.map((plant) => ({
          inStock: plant.inStock ?? true, // default true
          ...plant,
        }));
        setPlants(plantsWithStock);
      })
      .catch((err) => console.error(err));
  }, []);

  // Add new plant
  const addNewPlant = (newPlant) => {
    const plantToAdd = { ...newPlant, inStock: true }; // optional default inStock
    setPlants([...plants, plantToAdd]);
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plantToAdd),
    }).catch((err) => console.error(err));
  };

  // Toggle inStock
  const toggleStock = (id) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
      )
    );

    const plantToUpdate = plants.find((p) => p.id === id);
    if (plantToUpdate) {
      fetch(`http://localhost:6001/plants/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: !plantToUpdate.inStock }),
      }).catch((err) => console.error(err));
    }
  };

  // Filter plants by search
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <NewPlantForm onAddPlant={addNewPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={filteredPlants} onToggleStock={toggleStock} />
    </div>
  );
}

export default App;
