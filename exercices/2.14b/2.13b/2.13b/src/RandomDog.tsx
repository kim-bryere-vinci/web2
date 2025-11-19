
import "./RandomDog.css";
import { useEffect, useState } from "react"

interface Dog{
    message: string,
    status: string
}

const RandomDog = (() =>{
    const [randomDog, setRandomDog] = useState<Dog | undefined> (undefined);

    const fetchdog = async () => {
        try{
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
        if(!response.ok) throw new Error(`fetch error ${response.status} : ${response.statusText}`);
        const dog = await response.json();
        setRandomDog(dog);
        }catch(err){
            console.log("Random Dog :: error" + err);
        }
    };

    useEffect(() => {
        fetchdog(); },[]);

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