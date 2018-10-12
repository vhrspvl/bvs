# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class VerifyDrivingLicenseVerification(Document):
	pass


@frappe.whitelist()
def get_check(applicant_id):
	driving_license_verification_id = frappe.get_list("Driving License Verification", filters={"applicant_id":applicant_id}, fields=("name"))
	# frappe.errprint(employment_check1_id)
	return driving_license_verification_id


@frappe.whitelist()
def get_tat():
    aadhar = frappe.db.sql(""" select name from `tabVerify Driving License Verification` where status = 'Pending'""", as_dict = 1)
    for a in aadhar:
        aadhar_id = frappe.get_doc("Verify Driving License Verification",a["name"])
        tat = aadhar_id.tat
        in_date = aadhar_id.in_date
        if in_date:
            today = date.today()
            day = (today - in_date).days
            tat =  tat - day 
            aadhar_id.update({
                "tat": tat
            })    
            aadhar_id.save(ignore_permissions=True)
            frappe.db.commit()