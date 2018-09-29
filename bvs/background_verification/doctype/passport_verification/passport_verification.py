# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
import re
from frappe.model.document import Document

class PassportVerification(Document):
    def validate(self):
        self.validate_passport()

    def validate_passport(self):
        if(self.passport_number):
            pp = self.passport_number
            match = re.match("[A-Z0-9]{8}$", pp)
            if not match:
                frappe.msgprint("Please Enter a Valid Passport Number")
                self.passport_number = ''



@frappe.whitelist()
def get_status(applicant_id):
    status = frappe.db.get_value("Passport Verification", {"applicant_id": applicant_id}, "status")
    return status