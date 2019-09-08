# -*- coding: utf-8 -*-
# Copyright (c) 2019, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import json
from frappe.model.document import Document


class GenerateSO(Document):
    pass


@frappe.whitelist()
def create_so(customer, delivery_date, project, item_code, qty, child):
    if customer:
        so = frappe.new_doc("Sales Order")
        # so_items = so
        so.update({
            "customer": customer,
            "delivery_date": delivery_date,
            "project": project
        })
        so.append("items", {
            "item_code": item_code,
            "qty": qty,
            "description": child
        })
        so.save(ignore_permissions=True)
    return so


@frappe.whitelist()
def update_so_status(ref_id):
    if ref_id:
        app_id = frappe.get_doc("Applicant", ref_id)
        if app_id:
            app_id.update({
                "sale_order_status": "Confirmed"
            })
            app_id.save(ignore_permissions=True)
            frappe.db.commit()
    return "OK"
