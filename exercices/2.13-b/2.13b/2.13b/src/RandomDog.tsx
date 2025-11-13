
import "./RandomDog.css";
import { useEffect, useState } from "react"

interface Dog{
    message: string,
    status: string
}

const RandomDog = (() =>{
    const [randomDog, setRandomDog] = useState<Dog | undefined> (undefined);

    const fetchDog = () => { fetch("https://dog.ceo/api/breeds/image/random")
                        .then((response) => {if(!response.ok) throw new Error(`fetch error ${response.status} : ${response.statusText}`);
                        return response.json()})
                        .then((dog) => setRandomDog({message: dog.message ?? "Random dog not found", status: dog.status ?? "Error"}))
                        .catch((err) => console.log("Random Dog :: error" + err))};

    useEffect(() => fetchDog(), []);

    if(!randomDog){
        return <p>Loading...</p>
    }

    return (
        <div className="dog-content">
            <img src={randomDog.message} alt="random dog" className="dog-image-card" />
        </div>
    )                   
})

export default RandomDog;