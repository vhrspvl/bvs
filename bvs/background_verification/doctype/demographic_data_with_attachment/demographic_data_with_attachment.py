# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class DemographicDataWithAttachment(Document):
	pass

@frappe.whitelist()
def create_applicant(doc,method):
	applicant_id = frappe.db.get_value("Applicant", {"email_id": doc.email_id})
	if applicant_id:
		applicant = frappe.get_doc("Applicant", applicant_id)
	else:
		applicant = frappe.new_doc("Applicant")
	applicant.update({
		"customer": doc.customer,
		"checks_group": doc.checks_group,
		"candidate_name": doc.candidate_name,
		"father_name": doc.father_name,
		"contact_number": doc.name,
		"gender": doc.gender,
		"dob": doc.dob,
		"age": doc.age,
		"in_date": doc.in_date,
		"email_id": doc.email_id,
		"address_line1": doc.address_line1,
        "address_line2": doc.address_line2,
		"address_line3": doc.address_line3,
		"talukdistrict": doc.talukdistrict,
		"city": doc.city,
		"state": doc.state,
		"country": doc.country,
		"pincode": doc.pincode
	})
	applicant.save(ignore_permissions=True)
	return "OK"