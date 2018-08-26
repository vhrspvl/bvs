# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class VerifyRationCardVerification(Document):
	pass


@frappe.whitelist()
def get_check(applicant_id):
	ration_card_verification_id = frappe.get_list("Ration Card Verification", filters={"applicant_id":applicant_id}, fields=("name"))
	# frappe.errprint(employment_check1_id)
	return ration_card_verification_id

@frappe.whitelist()
def get_status(applicant):
	status = frappe.db.get_value("Verify Ration Card Verification", {"applicant_id":applicant}, "status")
	# frappe.errprint(status)
	return status