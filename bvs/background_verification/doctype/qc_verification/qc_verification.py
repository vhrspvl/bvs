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
    return applicant


@frappe.whitelist()
def get_case(customer):
    applicant = frappe.get_doc("Applicant", {"executive": frappe.session.user,"customer":customer})
    return applicant


@frappe.whitelist()
def get_applicant_c(candidate_name):
    applicant = frappe.db.get_list("Applicant", {"candidate_name": candidate_name,"executive": frappe.session.user},
                                     ["name"])
    return applicant

@frappe.whitelist()
def get_applicant_e(emp_code):
    applicant = frappe.db.get_list("Applicant", {"client_employee_code": emp_code,"executive": frappe.session.user},
                                     ["name"])
    return applicant