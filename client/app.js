import React, { useState, useEffect } from 'react';

function App() {
   const [people, setPeople] = useState([]);

   useEffect(() => {
       const fetchData = async () => {
           const response = await fetch('http://localhost:3001/api/people'); 
           const data = await response.json();
           setPeople(data);
       };
       fetchData();
   }, []);

   return (
       <div>
           {people.map(person => (
               <div key={person._id}>
                   {person.firstName} {person.lastName}
               </div>
           ))}
       </div>
   );
}

export default App;