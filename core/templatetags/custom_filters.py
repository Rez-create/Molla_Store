from django import template

register = template.Library()


@register.filter
def total_price(price, qty):
    return int(qty) * float(price)
