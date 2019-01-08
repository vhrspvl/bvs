# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class VerifyEmploymentCheck1(Document):
	pass

@frappe.whitelist()
def get_check(applicant_id):
	employment_check1_id = frappe.get_list("Employment Check1", filters={"applicant_id":applicant_id}, fields=("name"))
	# frappe.errprint(employment_check1_id)
	return employment_check1_id


@frappe.whitelist()
def get_status(applicant):
	status = frappe.db.get_value("Verify Employment Check1", {"applicant_id":applicant}, "status")
	# frappe.errprint(status)
	return status


@frappe.whitelist()
def get_client_tat(checks_group):
	tat = frappe.get_doc("Checks Group", {"name":checks_group})
	return tat






# @frappe.whitelist()
# def get_child_table(applicant_id):
# 	doc_a = frappe.get_doc("Allocate Checks",applicant_id)
# 	list1 = []
# 	for t in doc_a.get("allocated_to"):
# 		list1.append({
# 						"allocated_to":t.allocated_to
# 					})
# 		frappe.errprint(allocated_to)
# 	return list1