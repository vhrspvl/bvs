# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class QCVerification(Document):
    pass



@frappe.whitelist()
def get_cases(name):
    applicant = frappe.get_doc("Applicant", {"name": name})
    frappe.errprint(applicant)
    return applicant


@frappe.whitelist()
def get_case(customer):
    applicant = frappe.get_doc("Applicant", {"executive": frappe.session.user,"customer":customer})
    return applicant