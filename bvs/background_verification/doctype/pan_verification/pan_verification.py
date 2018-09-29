# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import re
from frappe.model.document import Document

class PanVerification(Document):
    def validate(self):
        self.validate_pan()

    def validate_pan(self):
        if(self.pan_number):
            pp = self.pan_number
            match = re.match("[A-Z0-9]{10}$", pp)
            if not match:
                frappe.msgprint("Please Enter a Valid Pan Number")
                self.pan_number = ''



@frappe.whitelist()
def get_status(applicant_id):
    status = frappe.db.get_value("Pan Verification", {"applicant_id": applicant_id}, "status")
    return status