/* =========================================
   CARRINHO LUMINA
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".cart-item");

    const subtotalElement =
        document.getElementById("subtotal");

    const totalElement =
        document.getElementById("total");

    const shippingElement =
        document.getElementById("shipping");

    const cartCount =
        document.getElementById("cart-count");


    let shipping = 12;

    let discount = 0;


    /* =========================================
       FORMATAÇÃO DE PREÇO
    ========================================= */

    function formatPrice(value) {

        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    }


    /* =========================================
       ATUALIZAR CARRINHO
    ========================================= */

    function updateCart() {

        const currentItems =
            document.querySelectorAll(".cart-item");


        let subtotal = 0;

        let totalItems = 0;


        currentItems.forEach(item => {

            const price =
                parseFloat(item.dataset.price);

            const quantity =
                parseInt(
                    item.querySelector(".quantity-value").textContent
                );


            subtotal += price * quantity;

            totalItems += quantity;

        });


        /* frete grátis acima de R$150 */

        if (subtotal >= 150) {

            shipping = 0;

            shippingElement.textContent =
                "grátis";

        } else {

            shipping = 12;

            shippingElement.textContent =
                formatPrice(shipping);

        }


        let total =
            subtotal + shipping - discount;


        if (total < 0) {
            total = 0;
        }


        subtotalElement.textContent =
            formatPrice(subtotal);


        totalElement.textContent =
            formatPrice(total);


        cartCount.textContent =
            `${totalItems} ${totalItems === 1 ? "item" : "itens"}`;

    }


    /* =========================================
       BOTÕES + E -
    ========================================= */

    items.forEach(item => {

        const minus =
            item.querySelector(".minus");

        const plus =
            item.querySelector(".plus");

        const quantity =
            item.querySelector(".quantity-value");


        plus.addEventListener("click", () => {

            let value =
                parseInt(quantity.textContent);

            value++;

            quantity.textContent = value;

            updateCart();

        });


        minus.addEventListener("click", () => {

            let value =
                parseInt(quantity.textContent);


            if (value > 1) {

                value--;

                quantity.textContent = value;

                updateCart();

            }

        });


        /* =========================================
           REMOVER PRODUTO
        ========================================= */

        const remove =
            item.querySelector(".remove");


        remove.addEventListener("click", () => {

            item.style.animation =
                "removeItem 0.4s forwards";


            setTimeout(() => {

                item.remove();

                updateCart();

            }, 400);

        });

    });


    /* =========================================
       CUPOM
    ========================================= */

    const couponInput =
        document.getElementById("coupon");

    const couponButton =
        document.getElementById("apply-coupon");


    couponButton.addEventListener("click", () => {

        const coupon =
            couponInput.value
            .trim()
            .toUpperCase();


        if (coupon === "LUMINA10") {

            if (discount === 0) {

                const subtotal =
                    parseFloat(
                        subtotalElement.textContent
                        .replace("R$", "")
                        .replace(".", "")
                        .replace(",", ".")
                    );


                discount =
                    subtotal * 0.10;


                couponButton.textContent =
                    "aplicado ✓";


                couponButton.style.background =
                    "#9baa96";

                couponButton.style.color =
                    "white";


                updateCart();

            }

        } else {

            couponInput.style.borderColor =
                "#c9969d";


            couponInput.value = "";

            couponInput.placeholder =
                "cupom inválido";


            setTimeout(() => {

                couponInput.style.borderColor =
                    "#d6d0d1";

                couponInput.placeholder =
                    "cupom de desconto";

            }, 2000);

        }

    });


    /* =========================================
       FINALIZAR PEDIDO
    ========================================= */

    const checkout =
        document.getElementById("checkout");


    checkout.addEventListener("click", () => {

        const numberOfItems =
            document.querySelectorAll(".cart-item").length;


        if (numberOfItems === 0) {

            alert(
                "Seu carrinho está vazio. ✿"
            );

            return;

        }


        checkout.innerHTML =
            "pedido iniciado ✓";


        checkout.style.background =
            "#91a78d";


        setTimeout(() => {

            alert(
                "Obrigada por escolher a LUMINA! ♡\n\nSeu pedido está sendo preparado com muito carinho."
            );


            checkout.innerHTML =
                'finalizar pedido <span>→</span>';


            checkout.style.background =
                "#8e8794";

        }, 800);

    });


    /* =========================================
       ANIMAÇÃO DOS PRODUTOS AO ENTRAR NA TELA
    ========================================= */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.animation =
                            "itemAppear 0.7s ease forwards";

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    items.forEach(item => {

        observer.observe(item);

    });


    /* =========================================
       EFEITO NOS LINKS DO NAVBAR
    ========================================= */

    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            link.style.transform =
                "scale(0.95)";

            setTimeout(() => {

                link.style.transform =
                    "scale(1)";

            }, 150);

        });

    });


    /* =========================================
       ATUALIZAÇÃO INICIAL
    ========================================= */

    updateCart();

});