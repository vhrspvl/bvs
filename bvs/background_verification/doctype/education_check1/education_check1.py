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

@frappe.whitelist()
def get_address(applicant):
	value = frappe.get_list("Address Check1", filters={"applicant_id":applicant}, fields=("applicant_name","address_line1","address_line2","address_line3","talukdistrict","state","city","country","pincode")) 
	# frappe.errprint(value)
	return value


@frappe.whitelist()
def get_status(applicant_id):
    status = frappe.db.get_value("Education Check1", {"applicant_id": applicant_id}, "status")
    return status

@frappe.whitelist()
def get_vstatus(applicant_id):
    result = frappe.db.get_value("Verify Education Check1", {"applicant_id": applicant_id}, "result")
    return result