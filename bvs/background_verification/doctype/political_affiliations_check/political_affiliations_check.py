# -*- coding: utf-8 -*-
# Copyright (c) 2019, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class PoliticalAffiliationsCheck(Document):
    pass


@frappe.whitelist()
def get_status(applicant_id):
    status = frappe.db.get_value("Political Affiliations Check", {
                                 "applicant_id": applicant_id}, "status")
    return status


@frappe.whitelist()
def get_vstatus(applicant_id):
    result = frappe.db.get_value("Verify Political Affiliations Check", {
                                 "applicant_id": applicant_id}, "result")
    return result
