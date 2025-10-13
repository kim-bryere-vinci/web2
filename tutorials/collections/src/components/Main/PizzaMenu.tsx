import "./PizzaMenu.css"
const pizzas = [
    {
        id: 1, 
        title : "4 fromages",
        contenu: "Gruyère, Sérac, Appenzel, Gorgonzola, Tomates"
    },
    {
        id: 2, 
        title : "Vegan",
        contenu: "Tomates, Courgettes, Oignons, Aubergines, Poivrons"
    },
    {
        id: 3, 
        title : "Vegetarian",
        contenu: "Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives"
    },
    {
        id: 4, 
        title : "Alpage",
        contenu: "Gruyère, Mozarella, Lardons, Tomates"
    },
    {
        id: 5, 
        title : "Diable",
        contenu: "Tomates, Mozarella, Chorizo piquant, Jalapenos"
    }
];

const PizzaMenu = () => {
    return (
        <table className="pizza-menu">
            <thead>
                <tr>
                    <th>Pizza</th>
                    <th>Decsription</th>
                </tr>
            </thead>
            <tbody>
                {pizzas.map((pizza) => (
                    <tr key={pizza.id}>
                        <td>{pizza.title}</td>
                        <td>{pizza.contenu}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PizzaMenu;
