# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class VerifyEducationCheck2(Document):
	pass


@frappe.whitelist()
def get_check(applicant_id):
	education_check2_id = frappe.get_list("Education Check2", filters={"applicant_id":applicant_id}, fields=("name"))
	# frappe.errprint(employment_check1_id)
	return education_check2_id

@frappe.whitelist()
def get_status(applicant):
	status = frappe.db.get_value("Verify Education Check2", {"applicant_id":applicant}, "status")
	# frappe.errprint(status)
	return status


