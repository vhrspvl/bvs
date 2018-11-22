# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class DataEntryAllocation(Document):
    pass



@frappe.whitelist()
def create_dashboard(doc,method):
    customer = frappe.db.get_value("Entry Dashboard", {"customer": doc.customer})
    if customer:
        cust = frappe.get_doc("Entry Dashboard", customer)
    else:
        cust = frappe.new_doc("Entry Dashboard")
    cust.update({
        "customer": doc.customer,
        "no_of_cases": doc.no_of_cases,
        "executive": doc.executive		
    })
    cust.save(ignore_permissions=True)
    return "OK"



@frappe.whitelist()
def get_pending_cases():
    pending = frappe.db.sql("""select sum(cases_pending) as count,executive from `tabData Entry Allocation` where cases_pending != 0 GROUP BY executive """,as_dict = 1)
    args = []
    for case in pending:
        app_pending = frappe.get_list("Applicant", filters={"executive":case.executive, "status": "Entry Pending"})        
        pending_cases = len(app_pending) + case.count
        executive = case.executive
        args.append(frappe._dict({
            "executive": executive,
            "pending_cases": pending_cases
        }))
    return args