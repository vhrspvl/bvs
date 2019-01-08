# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class EmploymentCheck2(Document):
	pass



@frappe.whitelist()
def get_value(applicant):
	value = frappe.get_list("Employment Check1", filters={"applicant_id":applicant}, fields=("employee_name","location","contact_number")) 
	# frappe.errprint(value)
	return value




@frappe.whitelist()
def get_status(applicant_id):
    status = frappe.db.get_value("Employment Check2", {"applicant_id": applicant_id}, "status")
    return status


@frappe.whitelist()
def get_vstatus(applicant_id):
    result = frappe.db.get_value("Verify Employment Check2", {"applicant_id": applicant_id}, "result")
    return result