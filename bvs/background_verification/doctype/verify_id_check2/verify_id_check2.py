# -*- coding: utf-8 -*-
# Copyright (c) 2019, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class VerifyIDCheck2(Document):
    pass


@frappe.whitelist()
def get_check(applicant_id):
    family_check2_id = frappe.get_list(
        "ID Check2", filters={"applicant_id": applicant_id}, fields=("name"))
    # frappe.errprint(employment_check1_id)
    return family_check2_id


@frappe.whitelist()
def get_status(applicant):
    status = frappe.db.get_value(
        "Verify ID Check2", {"applicant_id": applicant}, "status")
    # frappe.errprint(status)
    return status
