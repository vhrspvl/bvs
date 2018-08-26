# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class VerifyAadharCardVerification(Document):
	pass

@frappe.whitelist()
def get_check(applicant_id):
	aadhar_card_verification_id = frappe.get_list("Aadhar Card Verification", filters={"applicant_id":applicant_id}, fields=("name"))
	# frappe.errprint(employment_check1_id)
	return aadhar_card_verification_id