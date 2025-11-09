import React, {useState, useEffect} from "react";
// Import header from Header.js
import Header from "./Header";
// Import PlantPage from PlantPage.js
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";


function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Fetch plants from the API db.json on component mount
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data));    
  }, []);

//  Filter plants based on search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
// function to add new plant
  const addNewPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };
  

  return (
    <div className="app">
      <Header />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NewPlantForm onAddPlant={addNewPlant} />
      <PlantList plants={plants} />
    </div>
  );
}

export default App;
