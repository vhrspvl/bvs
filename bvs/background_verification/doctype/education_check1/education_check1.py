# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class EducationCheck1(Document):
	pass




@frappe.whitelist()
def get_value(applicant):
	value = frappe.get_list("Applicant", filters={"name":applicant}, fields=("candidate_name","dob","age","address_line1","address_line2","address_line3","talukdistrict","state","city","country","pincode")) 
	# frappe.errprint(value)
	return value