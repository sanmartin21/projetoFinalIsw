import React, { useState } from 'react';
import './App.css';

function App() {
 const [data, setData] = useState('');

 const fetchData = async () => {
 try {
   const response = await fetch('http://localhost:3001'); 
   const result = await response.text();
   setData(result);
 } catch (error) {
   console.error(error);
 }
 };

 const saveDataToDatabase = async () => {
 try {
   const response = await fetch('http://localhost:3001/save', {
     method: 'POST',
     body: JSON.stringify({ data: data }), // Enviando os dados como um objeto
     headers: {
       'Content-Type': 'application/json'
     }
   });
   const result = await response.text();
   setData(result);
 } catch (error) {
   console.error(error);
 }
 };

 return (
 <div className="App">
   <header className="App-header">
     <h1>React Frontend</h1>
     <button onClick={fetchData}>Fetch Data from Backend</button>
     <button onClick={saveDataToDatabase}>Save Data to Database</button>
     <p>Data from Backend:</p>
     <pre>{data}</pre>
   </header>
 </div>
 );
}

export default App;

