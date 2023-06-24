function state(initialValue) {
    let value = initialValue

    function getValue() {
        return value
    }

    function setValue(newValue) {
        value = newValue
    }

    return [getValue, setValue]
}

const [database, setDatabase] = state([
    {
        id: 1,
        nome: "televisão",
        preco: 2500
    },
    {
        id: 2,
        nome: "Geladeira",
        preco: 1250,
    },
    {
        id: 3,
        nome: "Forno Elétrico",
        preco: 1500,
    },
    {
        id: 4,
        nome: "Churrasqueira",
        preco: 3500,
    },
])

const [cart, setCart] = state([])

function cartDataAnalysis() {
    const cartLocalJson = localStorage.getItem("cart")

    if (cartLocalJson) {
        const cartLocal = JSON.parse(cartLocalJson)

        return setCart(cartLocal)
    }
}

cartDataAnalysis()

function showProducts(products = database()) {
    const container = document.querySelector("#produtos");

    products.forEach((product) => {
        container.insertAdjacentHTML(
            "beforeend",
            `
            <li>
            ${product.nome}
            R$ ${product.preco}
            <button onclick="addToCart(${product.id})" id="${product.id}">
            Adicionar ao Carrinho
            </button>
            </li>
            `
        );
    });
    return container;
}

function addToCart(id, products = database()) {
    const selectedProduct = products.find((element) => element.id === id)

    setCart([...cart(), selectedProduct])

    const productsJson = JSON.stringify(cart())

    localStorage.setItem("cart", productsJson)

    console.log(productsJson)

    return showProductsInCart()
}

function showProductsInCart(products = cart()) {
    const container = document.querySelector("#carrinho")

    container.innerHTML = ''

    products.forEach((product) => {
        container.insertAdjacentHTML(
            "beforeend",
            `
            <li>
            ${product.nome}
            R$ ${product.preco}
            <button onClick={removeFromCart(${product.id})} id={${product.id}> 
            Remover do Carrinho
            </button>
            </li>`
        )
    });
    return container
}

function removeFromCart(id, products = cart()) {
    const findProduct = products.findIndex((element) => element.id === id)
    const newCartProducts = [...products]
    newCartProducts.splice(findProduct, 1)
    setCart(newCartProducts)

    const productsJSON = JSON.stringify(cart())

    localStorage.setItem("cart", productsJSON)

    return showProductsInCart()
}
showProducts()
showProductsInCart()

