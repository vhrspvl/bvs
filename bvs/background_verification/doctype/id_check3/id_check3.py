# -*- coding: utf-8 -*-
# Copyright (c) 2019, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class IDCheck3(Document):
    pass


@frappe.whitelist()
def get_value(applicant):
    value = frappe.get_doc("Applicant", applicant)
    return value


@frappe.whitelist()
def get_status(applicant_id):
    status = frappe.db.get_value(
        "ID Check3", {"applicant_id": applicant_id}, "status")
    return status


@frappe.whitelist()
def get_vstatus(applicant_id):
    result = frappe.db.get_value(
        "Verify ID Check3", {"applicant_id": applicant_id}, "result")
    return result
