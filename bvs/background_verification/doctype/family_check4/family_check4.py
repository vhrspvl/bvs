# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class FamilyCheck4(Document):
	pass


@frappe.whitelist()
def get_status(applicant_id):
    status = frappe.db.get_value("Family Check4", {"applicant_id": applicant_id}, "status")
    return status