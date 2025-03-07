console.log("Working fine");

const monthNames = ["Jan", "Feb", "Mar", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];



$("#commentForm").submit(function(e){
    e.preventDefault();

    let dt = new Date();
    let time = dt.getDay() + " " + monthNames[dt.getUTCMonth()] + ", " + dt.getUTCFullYear()

    $.ajax({
        data: $(this).serialize(),

        method: $(this).attr("method"),

        url: $(this).attr("action"),

        dataType: "json",

        success: function(res){
            console.log("Hello saved your review");

            if (res.bool == true){
                $("#review-res").html("Review added successfully.")
                $(".hide-comment-form").hide()
                $(".add-review").hide()

                let _html = '<div class="col-auto review">'
                    _html += '<div class="row no-gutters">'
                    _html += '<div class="col-auto">'
                    _html += '<img src="https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg">'
                    _html += '<h4><a href="#">'+ res.context.user +'</a></h4>'

                    for(let i = 1; i <= res.context.rating; i++ ){
                        _html += '<i class="fas fa-star text-warning"></i>'
                    }

                    _html += '<span class="review-date">' + time + '</span>'
                    _html += '</div><!-- End .col -->'

                    _html += '<div class="col">'
                    _html += '<div class="review-content">'
                    _html += '<p>'+ res.context.review +'</p>'

                    _html += '</div><!-- End .review-content -->'
                    _html += '<div class="review-action">'
                    _html += '<a href="#"><i class="icon-thumbs-up"></i>Helpful (2)</a>'
                    _html += '<a href="#"><i class="icon-thumbs-down"></i>Unhelpful (0)</a>'
                    _html += '</div><!-- End .review-action -->'
                    _html += '</div><!-- End .col-auto -->'
                    _html += '</div><!-- End .row -->'
                    _html += '</div><!-- End .review -->'

                    $(".reviews-list").prepend(_html)
            }


        }
    })

})



$(document).ready(function (){
    $(".filter-checkbox, #price-filter-btn").on("click", function(){
        // console.log("A checkbox has been clicked");

        let filter_object = {}

        let min_Price = $("#price_max").attr("min")
        let max_Price = $("#price_max").val()

        filter_object.min_Price = min_Price;
        filter_object.max_Price = max_Price;

        $(".filter-checkbox").each(function(){
            let filter_value = $(this).val()
            let filter_key = $(this).data("filter") // vendor, category

            console.log("Filter value is:", filter_value);
            console.log("Filter key is:", filter_key);

            filter_object[filter_key] = Array.from(document.querySelectorAll('input[data-filter=' + filter_key + ']:checked')).map(function(element){
                return element.value
            })
        })
        console.log("Filter Object is:", filter_object);
        $.ajax({
            url: '/filter-products',
            data: filter_object,
            dataType: 'json',
            beforeSend: function(){
                // console.log("Trying to filter products....");
            },
            success: function(response){
                console.log(response);
                console.log("Data filtered successfully...");
                $("#filtered-product").html(response.data);
            },
        })

    })

    $("#price_max").on("blur", function(){
        let min_price = $(this).attr("min")
        let max_price = $(this).attr("max")
        let current_price = $(this).val()

        console.log("Current Price is:", current_price);
        console.log("Min Price is:", min_price);
        console.log("Max Price is:", max_price);

        if(current_price < parseInt(min_price) || current_price > parseInt(max_price)){
            // console.log("Price error ocurred");

            min_price = Math.round(min_price * 100) / 100

            max_price = Math.round(max_price * 100) / 100
            }
            // console.log("Max Price is:", max_Price);
            // console.log("Min Price is:", min_Price);

            alert("Price must be between $" +min_price + ' and $' +max_price )
            $(this).val('min_Price')
            $('#range').val(min_price)

            $(this).val.focus()

            return false
        })

    })

    // Add to cart functionality
    $("#add-to-cart-btn").on("click",  function(){

        let this_val = $(this)
        let index = this_val.attr("data-index")

        let quantity = $(".product-quantity-" + index).val()
        let product_title = $(".product-title-" + index).val()
        let product_id = $(".product-id-" + index).val()
        let product_price = $("#current-new-price-" + index).text()
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

FIXME: // NOT WORKING AS expected
    $(".delete-product").on("click",  function(){

        let product_id = $(this).attr("data-product")
        let this_val = $(this)

        console.log("Product ID:", product_id);

        $.ajax({
            url: "/delete-from-cart",
            data: {
                "id": product_id
            },
            dataType: "json",
            beforeSend: function(){
                this_val.hide()
            },
            success: function(response){
                this_val.show()

                if (response.totalcartitems > 0) {
                    $(".cart-items-count").text(response.totalcartitems)
                    $("#cart-list").html(response.data)
                } else {
                    $(".cart-items-count").text("0")
                    $("#cart-list").html("<p>Your cart is empty.</p>")
                }
            }
        })
    
    })

    
TODO: // fix later
    $(".update-product").on("click",  function(){

        let product_id = $(this).attr("data-product")
        let this_val = $(this)
        let product_quantity = $(".product-qty-"+product_id).val()

        console.log("Product ID:", product_id);
        console.log("Product Quantity:", product_quantity);

        $.ajax({
            url: "/update-cart",
            data: {
                "id": product_id,
                "qty": product_quantity,
            },
            dataType: "json",
            beforeSend: function(){
                this_val.show()
            },
            success: function(response){
                this_val.show()

                if (response.totalcartitems > 0) {
                    $(".cart-items-count").text(response.totalcartitems)
                    $("#cart-list").html(response.data)
                } else {
                    $(".cart-items-count").text("0")
                    $("#cart-list").html("<p>Your cart is empty.</p>")
                }
            }
        })
    
    })

    
    




//  Add to cart functionality
// $("#add-to-cart-btn").on("click",  function(){
//     let quantity = $("#product-quantity").val()
//     let product_title = $(".the-product-title").val()
//     let product_id = $(".product-id").val()
//     let product_price = $("#current-new-price").text()
//     let this_val = $(this)


//     console.log("Quantity:", quantity);
//     console.log("Title:", product_title);
//     console.log("Product ID:", product_id);
//     console.log("Product Price:", product_price);
//     console.log("Current element:", this_val);

//     $.ajax({
//         url: '/add-to-cart',
//         data: {
//             'id': product_id,
//             'qty': quantity,
//             'title': product_title,
//             'price': product_price,
//         },
//         dataType: 'json',
//         beforeSend: function(){
//             console.log("Adding Product to cart...");
//         },
//         success: function(response){
//             this_val.html("Item added to cart")
//             console.log("Product added to cart!");
//             $(".cart-items-count").text(response.totalcartitems)
