# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class VerifyEmploymentCheck3(Document):
	pass

@frappe.whitelist()
def get_check(applicant_id):
	employment_check3_id = frappe.get_list("Employment Check3", filters={"applicant_id":applicant_id}, fields=("name"))
	# frappe.errprint(employment_check1_id)
	return employment_check3_id


