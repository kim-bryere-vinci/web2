import Footer from "./Footer";
import Header from "./Header/Header";
import type { User } from "./Type";
import MenuUser from "./Users";

const App = () =>{
  const title = "Welcome to My App";

  const footerText = "© 2023 My App";
  const tableauUser: User[] = [
    {
        name: "Alice",
        age:25
    },
    {
        name: "Bob",
        age:30
    },
    {
        name: "Charlie",
        age:35
    },
    {
        name: "Kim",
        age:23
    },
    {
        name: "Rence",
        age:32
    }
];
  return (
      <div>
      <Header title={title}/>
      {tableauUser.map((user) => (
        <MenuUser user={user}/>
      ))}
      
      <Footer text={footerText}/>
      </div>
  )
};

export default App;