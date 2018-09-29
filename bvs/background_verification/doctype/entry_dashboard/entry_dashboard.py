# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class EntryDashboard(Document):
    pass


@frappe.whitelist()
def get_pending_cases(name):
    pending_case = frappe.get_doc("Data Entry Allocation",name)
    if pending_case:
        case = pending_case.cases_pending
        if case > 0:
            frappe.errprint(case)
            pc = case - 1
            pending_case.update({
                "cases_pending": pc
            })
            pending_case.save(ignore_permissions=True)
            frappe.db.commit()
            return "OK"



@frappe.whitelist()
def get_demographic_check(customer):
    case = frappe.db.get_value("Demographic Data With Attachement",{"customer":customer},"name")
    return case


