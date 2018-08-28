# -*- coding: utf-8 -*-
# Copyright (c) 2017, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class CriminalCheck(Document):
	pass


@frappe.whitelist()
def get_doc(applicant):
	address = frappe.db.get_value("Address Check1", {"applicant_id":applicant}, ["address_line1","address_line2","address_line3","talukdistrict","state","city","country","pincode"])
	# frappe.errprint(status)
	return address