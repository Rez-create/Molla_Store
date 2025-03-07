$("#add-to-cart-btn").on("click",  function(){

    let this_val = $(this)
    let index = this_val.attr("data-index")

    let quantity = $(".product-quantity-" + index).val()
    let product_title = $(".product-title-" + index).val()
    let product_id = $(".product-id-" + index).val()
    let product_price = $("#current-new-price-" + index).val()
    let product_pid = $(".product-pid-" + index).val()
    let product_image = $(".product-image-" + index).val()



    console.log("Quantity:", quantity);
    console.log("Title:", product_title);
    console.log("Product ID:", product_id);
    console.log("Product Price:", product_price);
    console.log("Product PID:", product_pid);
    console.log("Product Image:", product_image);
    console.log("Index:", index);
    console.log("Current element:", this_val);

    $.ajax({
        url: '/add-to-cart',
        data: {
            'id': product_id,
            'pid': product_pid,
            'image': product_image,
            'qty': quantity,
            'title': product_title,
            'price': product_price,
        },
        dataType: 'json',
        beforeSend: function(){
            console.log("Adding Product to cart...");
        },
        success: function(response){
            this_val.html("✅")
            console.log("Product added to cart!");
            $(".cart-items-count").text(response.totalcartitems)
        }
    })

})