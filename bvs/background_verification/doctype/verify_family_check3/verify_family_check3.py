# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class VerifyFamilyCheck3(Document):
	pass


@frappe.whitelist()
def get_check(applicant_id):
	family_check3_id = frappe.get_list("Family Check3", filters={"applicant_id":applicant_id}, fields=("name"))
	# frappe.errprint(employment_check1_id)
	return family_check3_id

@frappe.whitelist()
def get_status(applicant):
	status = frappe.db.get_value("Verify Family Check3", {"applicant_id":applicant}, "status")
	# frappe.errprint(status)
	return status


