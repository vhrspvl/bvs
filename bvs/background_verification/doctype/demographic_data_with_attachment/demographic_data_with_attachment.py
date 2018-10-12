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
	applicant_id = frappe.db.get_value("Applicant", {"email_id": doc.email_id, "contact_number": doc.contact_number})
	if applicant_id:
		applicant = frappe.get_doc("Applicant", applicant_id)
	else:
		applicant = frappe.new_doc("Applicant")
	applicant.update({
		"demographic_id": doc.name,
		"customer": doc.customer,
		"checks_group": doc.checks_group,
		"candidate_name": doc.candidate_name,
		"father_name": doc.father_name,
		"contact_number": doc.contact_number,
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



@frappe.whitelist()
def update_ref_id(ref_id,demographic_id):
	if ref_id:
		demo = frappe.get_doc("Demographic Data With Attachment", demographic_id)
	demo.update({
		"ref_id": ref_id
	})
	demo.save(ignore_permissions=True)
	return "OK"