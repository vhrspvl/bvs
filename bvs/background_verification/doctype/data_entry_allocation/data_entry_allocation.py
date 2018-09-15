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