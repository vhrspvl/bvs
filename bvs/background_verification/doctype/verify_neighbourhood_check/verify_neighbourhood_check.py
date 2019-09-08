# -*- coding: utf-8 -*-
# Copyright (c) 2019, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class VerifyNeighbourhoodCheck(Document):
    pass


@frappe.whitelist()
def get_check(applicant_id):
    neighbourhood_check_id = frappe.get_list("Neighbourhood Check", filters={
                                             "applicant_id": applicant_id}, fields=("name"))
    return neighbourhood_check_id
