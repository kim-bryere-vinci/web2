import './App.css'
import User from '../components/Users/index'

function App() {

  const Users = [
    {
      nom: "Kim",
      age: 23,
      isOnline: true
    },
    {
      nom: "Cindy",
      age: 20,
      isOnline: false
    },
    {
      nom: "Alexia",
      age: 26,
      isOnline: true
    },
    {
      nom: "Norah",
      age: 22,
      isOnline: false
    }
  ]
  const Users2 = [
    {
      nom: "Elena",
      age: 24,
      isOnline: true
    },
    {
      nom: "Stefan",
      age: 21,
      isOnline: false
    },
    {
      nom: "Jake",
      age: 27,
      isOnline: true
    },
    {
      nom: "Amy",
      age: 26,
      isOnline: false
    }
  ]

  const Users3 = [
    {
      nom: "Rosa",
      age: 22,
      isOnline: true
    },
    {
      nom: "Holt",
      age: 32,
      isOnline: false
    },
    {
      nom: "Damon",
      age: 21,
      isOnline: true
    },
    {
      nom: "Hitchcock",
      age: 34,
      isOnline: false
    }
  ]
  return (
    <div className='box'>
      {Users.map((user) => (
        <p key={user.nom}>
          <User nom={user.nom} age={user.age} isOnline={user.isOnline}/>
        </p>
        ))}

      {Users2.map((user) => (
        <p key={user.nom}>
          <User nom={user.nom} age={user.age} isOnline={user.isOnline}/>
        </p>
        ))}

      {Users3.map((user) => (
        <p key={user.nom}>
          <User nom={user.nom} age={user.age} isOnline={user.isOnline}/>
        </p>
        ))}
      

      {Users.map((user) => (
        <p key={user.nom}>
          <User nom={user.nom} age={user.age} isOnline={user.isOnline}/>
        </p>
        ))}

      {Users2.map((user) => (
        <p key={user.nom}>
          <User nom={user.nom} age={user.age} isOnline={user.isOnline}/>
        </p>
        ))}
      
      {Users3.map((user) => (
        <p key={user.nom}>
          <User nom={user.nom} age={user.age} isOnline={user.isOnline}/>
        </p>
        ))}

      {Users.map((user) => (
        <p key={user.nom}>
          <User nom={user.nom} age={user.age} isOnline={user.isOnline}/>
        </p>
        ))}
    </div>
  )
}

export default App
