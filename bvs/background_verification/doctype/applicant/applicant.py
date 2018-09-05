# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Applicant(Document):
	pass

@frappe.whitelist()
def get_check(applicant,check):
	check = frappe.db.get_value(check, {"applicant_id": applicant},
                                     ["name"])
	return check					   



