from django.urls import path, include
from core.views import category_list_view, payment_failed_view, payment_completed_view, cart_view, checkout_view, index, update_cart, filter_product, delete_item_from_cart, add_to_cart, product_list_view, search_view, ajax_add_review, tag_list, category_product_list_view, vendor_list_view, vendor_detail_view, product_detail_view

app_name = "core"

urlpatterns = [
    #homepage
    path("", index, name="index"),
    path("products/", product_list_view, name="product-list"),
    path("product/<pid>/", product_detail_view, name="product-detail"),


    # Category
    path("category/", category_list_view, name="category-list"),
    path("category/<cid>/", category_product_list_view, name="category-product-list"),

    # Vendor
    path("vendors/", vendor_list_view, name="vendor-list"),
    path("vendor/<vid>/", vendor_detail_view, name="vendor-detail"),

    # Tags
    path("products/tag/<slug:tag_slug>/", tag_list, name="tags"),

    # Add review
    path("ajax_add_review/<int:pid>/", ajax_add_review, name="ajax_add_review"),

    # Search
    path("search/", search_view, name="search"),

    #  Filter product url
    path("filter-products/", filter_product, name="filter-product"),

    # Add to cart  url
    path("add-to-cart/", add_to_cart, name="add-to-cart"),

    # ACart page url
    path("cart/", cart_view, name="cart"),

    # Delete item from cart url
    path("delete-from-cart/", delete_item_from_cart, name="delete-from-cart"),

    # Update cart url
    path("update-cart/", update_cart, name="update-cart"),

    # Checkout url
    path("checkout/", checkout_view, name="checkout"),

    # Paypal url
    path('paypal/', include('paypal.standard.ipn.urls')),

    # Payment successful
    path("payment-completed/", payment_completed_view, name="payment-completed"),

    # Payment failed
    path("payment-failed/", payment_failed_view, name="payment-failed"),

]
